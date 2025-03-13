const crypto = require('crypto');

// Utility functions for encryption and decryption
function encryptWithPublicKey(publicKey, data) {
    return crypto.publicEncrypt(publicKey, Buffer.from(data)).toString('base64');
}

function decryptWithPrivateKey(privateKey, encryptedData) {
    return crypto.privateDecrypt(privateKey, Buffer.from(encryptedData, 'base64')).toString();
}

function encryptWithSymmetricKey(key, data) {
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted };
}

function decryptWithSymmetricKey(key, iv, encryptedData) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Generate RSA key pairs for each user
function generateKeyPair() {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
}

// Simulate a group of 4 users
const users = {
    user1: generateKeyPair(),
    user2: generateKeyPair(),
    user3: generateKeyPair(),
    user4: generateKeyPair()
};

// Generate a group key (symmetric key)
const groupKey = crypto.randomBytes(32).toString('hex'); // 256-bit key for AES-256

// Encrypt the group key for each user using their public key
const encryptedGroupKeys = {};
for (const [userId, { publicKey }] of Object.entries(users)) {
    encryptedGroupKeys[userId] = encryptWithPublicKey(publicKey, groupKey);
}

// Simulate sending a message to the group
function sendGroupMessage(senderId, message) {
    console.log(`\n${senderId} is sending a message to the group: "${message}"`);

    // Encrypt the message with the group key
    const { iv, encryptedData } = encryptWithSymmetricKey(groupKey, message);

    // Broadcast the encrypted message and IV to the group
    console.log(`Encrypted message sent to the group:`, { iv, encryptedData });

    // Each user decrypts the message
    for (const [userId, { privateKey }] of Object.entries(users)) {
        // Decrypt the group key first (if not already done)
        const decryptedGroupKey = decryptWithPrivateKey(privateKey, encryptedGroupKeys[userId]);

        // Decrypt the message using the group key
        const decryptedMessage = decryptWithSymmetricKey(decryptedGroupKey, iv, encryptedData);

        console.log(`${userId} decrypted the message: "${decryptedMessage}"`);
    }
}

// Simulate the group chat
sendGroupMessage('user1', 'Hello, group!');
sendGroupMessage('user2', 'How is everyone doing?');
sendGroupMessage('user3', 'This is a secure group chat!');
sendGroupMessage('user4', 'Goodbye!');