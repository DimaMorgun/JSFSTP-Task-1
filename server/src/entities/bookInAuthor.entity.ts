import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';

import { BookEntity, AuthorEntity } from 'src/entities';

@Table
export class BookInAuthorEntity extends Model<BookInAuthorEntity> {

    @ForeignKey(() => BookEntity)
    @Column
    bookId: string;

    @ForeignKey(() => AuthorEntity)
    @Column
    authorId: string;
}
