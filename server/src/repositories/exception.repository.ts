import { Injectable } from '@nestjs/common';

import { Model, Connection } from 'mongoose';

import { ExceptionSchema, ExceptionDocument } from 'src/documents';

@Injectable()
export class ExceptionRepository {
    private exceptionModel: Model<ExceptionDocument>;

    constructor(
        private connection: Connection,
    ) {
        this.exceptionModel = this.connection.model('Exception', ExceptionSchema);
    }

    public async getById(id: string): Promise<ExceptionDocument> {
        const book: ExceptionDocument = await this.exceptionModel.findById(id).exec();

        return book;
    }

    public async getAll(): Promise<ExceptionDocument[]> {
        const books: ExceptionDocument[] = await this.exceptionModel.find().exec();

        return books;
    }

    public async getPaginated(skip: number, limit: number): Promise<ExceptionDocument[]> {
        const books: ExceptionDocument[] = await this.exceptionModel.find().skip(skip).limit(limit).exec();

        return books;
    }

    public async create(createBook: ExceptionDocument): Promise<ExceptionDocument> {
        const createdBook: Model<ExceptionDocument> = await new this.exceptionModel(createBook);
        const newBook: ExceptionDocument = createdBook.save();

        return newBook;
    }

    public async update(updateBook: ExceptionDocument): Promise<ExceptionDocument> {
        const updatedBook: ExceptionDocument = await this.exceptionModel.findByIdAndUpdate(updateBook._id, updateBook);

        return updatedBook;
    }

    public async delete(id: string): Promise<ExceptionDocument> {
        const deletedBook: ExceptionDocument = await this.exceptionModel.findByIdAndRemove(id);

        return deletedBook;
    }
}
