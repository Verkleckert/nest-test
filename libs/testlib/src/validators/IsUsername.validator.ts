import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function _IsUsername(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isUsername',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const nameRegex = /^(?![_.-])[a-zA-Z0-9._-]+(?<![_.-])$/;
                    return typeof value === 'string' && nameRegex.test(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid username`;
                },
            },
        });
    };
}
