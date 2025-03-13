import {Collection, Entity, ManyToMany, PrimaryKey, Property} from '@mikro-orm/core';
import {_BaseEntity} from '@testlib/testlib';
import {Role} from "@testlib/testlib/entities/db/role.entity";

@Entity({ schema: 'test1', tableName: 'permission' })
export class Permission extends _BaseEntity {
    @Property({ unique: true })
    name: string;

    @ManyToMany(() => Role, role => role.permissions, { nullable: true })
    roles: Collection<Role> = new Collection<Role>(this);

    constructor(name: string) {
        super();
        this.name = name;
    }
}

