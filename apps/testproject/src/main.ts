import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MikroORM} from "@mikro-orm/core";
import {INestApplication} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);

    await handleDevelopmentTasks(app);

}


async function handleDevelopmentTasks(app: INestApplication) {
    const orm = app.get(MikroORM);
    const schemaGenerator = orm.getSchemaGenerator();

    await schemaGenerator.ensureDatabase();
    await schemaGenerator.updateSchema({schema: 'test1'});
    await schemaGenerator.updateSchema({schema: 'test2'});
}

bootstrap();
