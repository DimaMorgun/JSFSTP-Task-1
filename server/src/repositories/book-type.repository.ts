import { Injectable } from '@nestjs/common';

import { Model, objectid } from 'mongoose';

import { BookTypeDocument, BookTypeSchema } from 'src/documents';

import * as mongoose from 'mongoose';

@Injectable()
export class BookTypeRepository {
    private readonly bookTypeModel: Model<BookTypeDocument>;

    constructor() {
        this.bookTypeModel = mongoose.model('BookType', BookTypeSchema);
    }

    public async getById(id: objectid): Promise<BookTypeDocument> {
        const bookType: BookTypeDocument = await this.bookTypeModel.findById(id).exec();

        return bookType;
    }

    public async getAll(): Promise<BookTypeDocument[]> {
        const bookTypes: BookTypeDocument[] = await this.bookTypeModel.find().exec();

        return bookTypes;
    }

    public async create(createBookType: BookTypeDocument): Promise<BookTypeDocument> {
        const createdBookType: Model<BookTypeDocument> = new this.bookTypeModel(createBookType);
        const newBookType: BookTypeDocument = createdBookType.save();

        return newBookType;
    }

    public async update(updateBookType: BookTypeDocument): Promise<BookTypeDocument> {
        const updatedBookType: BookTypeDocument = await this.bookTypeModel.findByIdAndUpdate(updateBookType._id, updateBookType);

        return updatedBookType;
    }

    public async delete(id: objectid): Promise<BookTypeDocument> {
        const deletedBookType: BookTypeDocument = await this.bookTypeModel.findByIdAndRemove(id);

        return deletedBookType;
    }
}
