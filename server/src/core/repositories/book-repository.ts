import { Inject, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';

import { Book } from 'src/core/models';

@Injectable()
export class BookRepository {
    constructor(@Inject('BOOK_MODEL') private readonly bookModel: Model<Book>) { }

    async getById(id: string): Promise<Book> {
        const book: Book = await this.bookModel.findById(id).exec();

        return book;
    }

    async getAll(): Promise<Book[]> {
        const books: Book[] = await this.bookModel.find().exec();

        return books;
    }

    async getPaginated(skip: number, limit: number): Promise<Book[]> {
        const books: Book[] = await this.bookModel.find().skip(skip).limit(limit).exec();

        return books;
    }

    async create(createBook: Book): Promise<Book> {
        const createdBook: Model<Book> = new this.bookModel(createBook);
        const newBook: Book = createdBook.save();

        return newBook;
    }

    async update(updateBook: Book): Promise<Book> {
        const updatedBook: Book = await this.bookModel.findByIdAndUpdate(updateBook.id, updateBook);

        return updatedBook;
    }

    async delete(id: string): Promise<Book> {
        const deletedBook: Book = await this.bookModel.findByIdAndRemove(id);

        return deletedBook;
    }
}
