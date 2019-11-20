import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';

import { BookEntity, BookInAuthorEntity } from 'src/entities';

import uuid = require('uuid/v4');

@Table
export class AuthorEntity extends Model<AuthorEntity> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: uuid(),
    })
    id?: string;

    @Column
    name?: string;

    @Column
    country?: string;

    @Column
    birthday?: Date;

    @Column
    deathday?: Date;

    @BelongsToMany(() => BookEntity, () => BookInAuthorEntity)
    books?: BookEntity[];

    @Column
    createdDate?: Date;

    @Column
    updatedDate?: Date;

    @Column
    isDeleted?: boolean;
}
