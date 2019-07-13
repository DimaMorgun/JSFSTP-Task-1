import { Injectable } from '@nestjs/common';

import { Types } from 'mongoose';

import { BookRepository } from 'src/repositories';
import { BookModel, CreateBookModel, UpdateBookModel } from 'src/models';
import { BookDocument } from 'src/documents';
import { BookMapper } from 'src/mappers/mapper.book';

@Injectable()
export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
        private readonly bookMapper: BookMapper,
    ) { }

    async getById(id: string): Promise<BookModel> {
        let book: BookModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (isValidId) {
            const bookDocument: BookDocument = await this.bookRepository.getById(id);
            book = this.bookMapper.getBookModel(bookDocument);
        }

        return book;
    }

    async getList(): Promise<BookDocument[]> {
        const bookDocuments: BookDocument[] = await this.bookRepository.getAll();
        // const books: BookModel[] = await this.bookMapper.getBookModels(bookDocuments);

        return bookDocuments;
    }

    async getPaginated(skip: number, limit: number): Promise<BookModel[]> {
        const bookDocuments: BookDocument[] = await this.bookRepository.getPaginated(skip, limit);
        const books: BookModel[] = await this.bookMapper.getBookModels(bookDocuments);

        return books;
    }

    async create(createBookModel: CreateBookModel): Promise<BookModel> {
        const createBookDocument: BookDocument = this.bookMapper.getBookDocument(createBookModel);
        const createdBookDocument: BookDocument = await this.bookRepository.create(createBookDocument);
        const createdBook: BookModel = this.bookMapper.getBookModel(createdBookDocument);

        return createdBook;
    }

    async update(updateBookModel: UpdateBookModel): Promise<BookModel> {
        const updateBookDocument: BookDocument = this.bookMapper.getBookDocument(updateBookModel);
        const updatedBookDocument: BookDocument = await this.bookRepository.update(updateBookDocument);
        const updatedBook: BookModel = this.bookMapper.getBookModel(updatedBookDocument);

        return updatedBook;
    }

    async delete(id: string): Promise<BookModel> {
        let deletedBook: BookModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (isValidId) {
            const deletedBookDocument: BookDocument = await this.bookRepository.delete(id);
            deletedBook = this.bookMapper.getBookModel(deletedBookDocument);
        }

        return deletedBook;
    }
}
