import { Table, Column, Model, DataType } from 'sequelize-typescript';

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
    id?: string;
    @Column
    name?: string;
    @Column
    price?: number;
    @Column
    type?: string;
    @Column
    authors?: string;
    @Column
    createdDate?: Date;
    @Column
    updatedDate?: Date;
    @Column
    isDeleted?: boolean;
}
