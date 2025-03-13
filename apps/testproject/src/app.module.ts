import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TestappModule} from "../../testapp/src/testapp.module";
import {BaseModule} from './base/base.module';
import {logger, MikroOrmModule} from "@mikro-orm/nestjs";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {Options, ReflectMetadataProvider} from "@mikro-orm/core";
import {LoadStrategy, PostgreSqlDriver} from "@mikro-orm/postgresql";
import {Role} from "@testlib/testlib/entities/db/role.entity";
import {Permission} from "@testlib/testlib/entities/db/permission.entity";

const mikroOrmConfig = MikroOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => createMikroOrmConfig(configService),
});

const createMikroOrmConfig = (configService: ConfigService): Options => ({
    user: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT'),
    dbName: configService.get<string>('POSTGRES_DATABASE'),
    driver: PostgreSqlDriver,
    entities: [Role, Permission],
    metadataProvider: ReflectMetadataProvider,
    loadStrategy: LoadStrategy.JOINED,
    timezone: '+02:00',
    logger: logger.log.bind(logger),
    debug: true,
    dynamicImportProvider: (id: string) => import(id),
});

@Module({
    imports: [
        TestappModule,
        BaseModule,
        ConfigModule.forRoot({envFilePath: ['.env']}),
        mikroOrmConfig,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
