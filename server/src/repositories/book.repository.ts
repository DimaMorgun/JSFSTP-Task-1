import { Injectable } from '@nestjs/common';

import { Model, objectid } from 'mongoose';

import { BookDocument, BookSchema } from 'src/documents';
import { FilterBookModel } from 'src/models';

import * as mongoose from 'mongoose';


@Injectable()
export class BookRepository {
    private readonly bookModel: Model<BookDocument>;

    constructor() {
        this.bookModel = mongoose.model('Book', BookSchema);
    }

    public async getFilteredList(filterModel: FilterBookModel): Promise<BookDocument[]> {
        const price = {
            $gte: filterModel.priceFrom,
            $lte: filterModel.priceTo,
        };
        const query = {
            price,
            type: filterModel.type,
            // name: filterModel.name,
        };

        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(query));

        const books: BookDocument[] = await this.bookModel.find(query);

        return books;
    }

    public async getById(id: objectid): Promise<BookDocument> {
        const book: BookDocument = await this.bookModel.findById(id).exec();

        return book;
    }

    public async getAll(): Promise<BookDocument[]> {
        const books: BookDocument[] = await this.bookModel.find().exec();

        return books;
    }

    public async getPaginated(skip: number, limit: number): Promise<BookDocument[]> {
        const books: BookDocument[] = await this.bookModel.find().skip(skip).limit(limit).exec();

        return books;
    }

    public async create(createBook: BookDocument): Promise<BookDocument> {
        const createdBook: Model<BookDocument> = new this.bookModel(createBook);
        const newBook: BookDocument = createdBook.save();

        return newBook;
    }

    public async update(updateBook: BookDocument): Promise<BookDocument> {
        const updatedBook: BookDocument = await this.bookModel.findByIdAndUpdate(updateBook._id, updateBook);

        return updatedBook;
    }

    public async delete(id: objectid): Promise<BookDocument> {
        const deletedBook: BookDocument = await this.bookModel.findByIdAndRemove(id);

        return deletedBook;
    }
}
