import {Module} from '@nestjs/common';
import {TestappController} from './testapp.controller';
import {TestappService} from './testapp.service';
import {TestlibModule} from "@testlib/testlib";


@Module({
    imports: [TestlibModule,],
    controllers: [TestappController],
    providers: [TestappService],
})
export class TestappModule {
}
