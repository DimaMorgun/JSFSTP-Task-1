import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';

import { AuthorEntity, BookInAuthorEntity } from 'src/entities';

import uuid = require('uuid/v4');

@Table
export class BookEntity extends Model<BookEntity> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: uuid(),
    })
    id: string;

    @Column
    name: string;

    @Column
    price: number;

    @Column
    type: string;

    @BelongsToMany(() => AuthorEntity, () => BookInAuthorEntity)
    authors: AuthorEntity[];

    @Column
    createdDate: Date;

    @Column
    updatedDate: Date;

    @Column
    isDeleted: boolean;
}
