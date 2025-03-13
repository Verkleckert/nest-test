import {Opt, PrimaryKey, Property} from "@mikro-orm/core";

export abstract class _BaseEntity {
    @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
    uuid!: string;
}

export abstract class _BaseEntityWithCreated extends _BaseEntity {
    @Property({ lazy: true, nullable: true, hidden: true })
    createdAt?: Date & Opt = new Date();
}

export abstract class _BaseEntityWithDates extends _BaseEntity {
    @Property({ lazy: true, nullable: true, hidden: true })
    createdAt?: Date & Opt = new Date();

    @Property({ onUpdate: () => new Date(), lazy: true, nullable: true, hidden: true })
    updatedAt?: Date & Opt = new Date();
}
