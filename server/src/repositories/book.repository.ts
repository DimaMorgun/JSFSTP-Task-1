import { Injectable } from '@nestjs/common';

import { Model, objectid } from 'mongoose';

import { BookDocument, BookSchema } from 'src/documents';

import * as mongoose from 'mongoose';

@Injectable()
export class BookRepository {
    private readonly bookModel: Model<BookDocument>;

    constructor() {
        this.bookModel = mongoose.model('Book', BookSchema);
    }

    async getById(id: objectid): Promise<BookDocument> {
        const book: BookDocument = await this.bookModel.findById(id).exec();

        return book;
    }

    async getAll(): Promise<BookDocument[]> {
        const books = await this.bookModel.find().exec();

        return books;
    }

    async getPaginated(skip: number, limit: number): Promise<BookDocument[]> {
        const books: BookDocument[] = await this.bookModel.find().skip(skip).limit(limit).exec();

        return books;
    }

    async create(createBook: BookDocument): Promise<BookDocument> {
        const createdBook: Model<BookDocument> = new this.bookModel(createBook);
        const newBook: BookDocument = createdBook.save();

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
