import {Module} from '@nestjs/common';
import {BaseService} from './base.service';
import {MikroOrmModule} from "@mikro-orm/nestjs";

@Module({
    imports: [MikroOrmModule.forFeature([]),],
    providers: [BaseService],
    exports: [BaseService],
})
export class BaseModule {
}
