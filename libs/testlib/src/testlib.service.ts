import {Injectable} from '@nestjs/common';

@Injectable()
export class TestlibService {
    public test(): string {
        return 'test';
    }

}
