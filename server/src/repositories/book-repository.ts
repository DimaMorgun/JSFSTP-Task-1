import { Injectable } from '@nestjs/common';

import { Connection, Model, objectid } from 'mongoose';

import { BookSchema, BookDocument } from 'src/documents';

import { Environment } from 'src/environment/environment';

@Injectable()
export class BookRepository {
    private readonly bookModel;
    private readonly db;
    constructor(
        private readonly environment: Environment,
    ) {
        const mongoose = require('mongoose');
        const connection = mongoose.createConnection(environment.databaseMongoConnectionUrl);
        this.bookModel = connection.model('Book', BookSchema);
    }

    async getById(id: objectid): Promise<BookDocument> {
        const book: BookDocument = await this.bookModel.findById(id).exec();

        return book;
    }

    async getAll(): Promise<BookDocument[]> {
        const books: BookDocument[] = await this.bookModel.find().exec();

        return books;
    }

    async getPaginated(skip: number, limit: number): Promise<BookDocument[]> {
        const books: BookDocument[] = await this.bookModel.find().skip(skip).limit(limit).exec();

        return books;
    }

    async create(createBook: BookDocument): Promise<BookDocument> {
        const newBook = await this.bookModel.save(createBook);

        return newBook;
    }

    async update(updateBook: BookDocument): Promise<BookDocument> {
        const updatedBook: BookDocument = await this.bookModel.findByIdAndUpdate(updateBook._id, updateBook);

        return updatedBook;
    }

    async delete(id: objectid): Promise<BookDocument> {
        const deletedBook: BookDocument = await this.bookModel.findByIdAndRemove(id);

        return deletedBook;
    }
}
