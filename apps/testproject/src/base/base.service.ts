import {Inject, Injectable} from '@nestjs/common';
import {EntityManager} from "@mikro-orm/core";

@Injectable()
export class BaseService {
    constructor(
        @Inject(EntityManager) private readonly em: EntityManager,
                ) {
    }
}
