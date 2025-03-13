import {Inject, Injectable} from '@nestjs/common';
import {EntityManager} from "@mikro-orm/core";
import {Role} from "@testlib/testlib/entities/db/role.entity";

@Injectable()
export class TestappService {
    constructor(
        @Inject(EntityManager) private readonly em: EntityManager,
    ) {
    }

    getHello(): string {
        return 'Hello World!';
    }

    async runEntityTest(uuid1: string) {
        return await this.em.findOne(
            Role,
            {uuid: uuid1},
            {populate: ['permissions'], schema: "test2"},
        )
    }
}
