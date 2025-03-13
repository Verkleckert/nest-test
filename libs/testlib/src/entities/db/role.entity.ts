import {Collection, Entity, ManyToMany, PrimaryKey, Property} from '@mikro-orm/core';
import {_BaseEntityWithDates,} from '@testlib/testlib';
import { Permission } from './permission.entity';

@Entity({ schema: '*' })
export class Role extends _BaseEntityWithDates {
    @Property({ unique: true })
    name: string;

    @Property({ nullable: true })
    description: string;

    @ManyToMany(() => Permission, permission => permission.roles, { owner: true, nullable: false })
    permissions: Collection<Permission> = new Collection<Permission>(this);

    constructor(name: string) {
        super();
        this.name = name;
    }
}

