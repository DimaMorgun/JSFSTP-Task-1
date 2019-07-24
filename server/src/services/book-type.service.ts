import { Injectable } from '@nestjs/common';

import { Types } from 'mongoose';

import { BookTypeRepository } from 'src/repositories';
import { BookTypeModel, CreateBookTypeModel, UpdateBookTypeModel } from 'src/models';
import { BookTypeDocument } from 'src/documents';

@Injectable()
export class BookTypeService {
    constructor(
        private readonly bookTypeRepository: BookTypeRepository,
    ) { }

    public async getById(id: string): Promise<BookTypeModel> {
        const bookType: BookTypeModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (!isValidId) {
            return bookType;
        }

        const bookTypeDocument: BookTypeDocument = await this.bookTypeRepository.getById(id);
        if (bookTypeDocument) {
            bookType.id = bookTypeDocument._id;
            bookType.name = bookTypeDocument.name;
            bookType.createdDate = bookTypeDocument.createdDate;
            bookType.updatedDate = bookTypeDocument.updatedDate;
            bookType.isDeleted = bookTypeDocument.isDeleted;
        }

        return bookType;
    }

    public async getList(): Promise<BookTypeModel[]> {
        const bookTypes: BookTypeModel[] = new Array<BookTypeModel>();

        const bookTypeDocuments: BookTypeDocument[] = await this.bookTypeRepository.getAll();
        if (!bookTypeDocuments || bookTypeDocuments.length === 0) {
            return bookTypes;
        }

        for (const bookTypeDocument of bookTypeDocuments) {
            const bookTypeModel: BookTypeModel = {};
            bookTypeModel.id = bookTypeDocument._id;
            bookTypeModel.name = bookTypeDocument.name;
            bookTypeModel.createdDate = bookTypeDocument.createdDate;
            bookTypeModel.updatedDate = bookTypeDocument.updatedDate;
            bookTypeModel.isDeleted = bookTypeDocument.isDeleted;

            bookTypes.push(bookTypeModel);
        }

        return bookTypes;
    }

    public async create(createBookTypeModel: CreateBookTypeModel): Promise<BookTypeModel> {
        const createdBookType: BookTypeModel = {};
        const createBookTypeDocument: BookTypeDocument = {};

        if (createBookTypeModel) {
            createBookTypeDocument.name = createBookTypeModel.name;
            createBookTypeDocument.createdDate = new Date();
            createBookTypeDocument.updatedDate = new Date();
            createBookTypeDocument.isDeleted = false;
        }

        const createdBookTypeDocument: BookTypeDocument = await this.bookTypeRepository.create(createBookTypeDocument);
        if (createdBookTypeDocument) {
            createdBookType.id = createdBookTypeDocument._id;
            createdBookType.name = createdBookTypeDocument.name;
            createdBookType.createdDate = createdBookTypeDocument.createdDate;
            createdBookType.updatedDate = createdBookTypeDocument.updatedDate;
            createdBookType.isDeleted = createdBookTypeDocument.isDeleted;
        }

        return createdBookType;
    }

    public async update(updateBookTypeModel: UpdateBookTypeModel): Promise<BookTypeModel> {
        const updatedBookType: BookTypeModel = {};
        const updateBookTypeDocument: BookTypeDocument = {};

        if (updateBookTypeModel) {
            updateBookTypeDocument._id = updateBookTypeModel.id;
            updateBookTypeDocument.name = updateBookTypeModel.name;
            updateBookTypeDocument.updatedDate = new Date();
        }

        const updatedBookTypeDocument: BookTypeDocument = await this.bookTypeRepository.update(updateBookTypeDocument);
        if (updatedBookTypeDocument) {
            updatedBookType.id = updatedBookTypeDocument._id;
            updatedBookType.name = updatedBookTypeDocument.name;
            updatedBookType.createdDate = updatedBookTypeDocument.createdDate;
            updatedBookType.updatedDate = updatedBookTypeDocument.updatedDate;
            updatedBookType.isDeleted = updatedBookTypeDocument.isDeleted;
        }

        return updatedBookType;
    }

    public async delete(id: string): Promise<BookTypeModel> {
        const deletedBookType: BookTypeModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (!isValidId) {
            return deletedBookType;
        }

        const deletedBookTypeDocument: BookTypeDocument = await this.bookTypeRepository.delete(id);
        if (deletedBookTypeDocument) {
            deletedBookType.id = deletedBookTypeDocument._id;
            deletedBookType.name = deletedBookTypeDocument.name;
            deletedBookType.createdDate = deletedBookTypeDocument.createdDate;
            deletedBookType.updatedDate = deletedBookTypeDocument.updatedDate;
            deletedBookType.isDeleted = deletedBookTypeDocument.isDeleted;
        }

        return deletedBookType;
    }
}
