import { Injectable } from '@nestjs/common';

import { Types } from 'mongoose';

import { BookRepository } from 'src/repositories';
import { BookModel, CreateBookModel, UpdateBookModel } from 'src/models';
import { BookDocument } from 'src/documents';
import { BookMapper } from 'src/mappers';

@Injectable()
export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
        private readonly bookMapper: BookMapper,
    ) { }

    public async getById(id: string): Promise<BookModel> {
        let book: BookModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (isValidId) {
            const bookDocument: BookDocument = await this.bookRepository.getById(id);
            book = this.bookMapper.getBookModel(bookDocument);
        }

        return book;
    }

    public async getList(): Promise<BookModel[]> {
        const bookDocuments: BookDocument[] = await this.bookRepository.getAll();
        const books: BookModel[] = await this.bookMapper.getBookModels(bookDocuments);

        return books;
    }

    public async getPaginated(skip: number, limit: number): Promise<BookModel[]> {
        const bookDocuments: BookDocument[] = await this.bookRepository.getPaginated(skip, limit);
        const books: BookModel[] = await this.bookMapper.getBookModels(bookDocuments);

        return books;
    }

    public async create(createBookModel: CreateBookModel): Promise<BookModel> {
        const createBookDocument: BookDocument = this.bookMapper.getBookDocumentFromCreateBookModel(createBookModel);
        const createdBookDocument: BookDocument = await this.bookRepository.create(createBookDocument);
        const createdBook: BookModel = this.bookMapper.getBookModel(createdBookDocument);

        return createdBook;
    }

    public async update(updateBookModel: UpdateBookModel): Promise<BookModel> {
        const updateBookDocument: BookDocument = this.bookMapper.getBookDocumentFromUpdateBookModel(updateBookModel);
        const updatedBookDocument: BookDocument = await this.bookRepository.update(updateBookDocument);
        const updatedBook: BookModel = this.bookMapper.getBookModel(updatedBookDocument);

        return updatedBook;
    }

    public async delete(id: string): Promise<BookModel> {
        let deletedBook: BookModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (isValidId) {
            const deletedBookDocument: BookDocument = await this.bookRepository.delete(id);
            deletedBook = this.bookMapper.getBookModel(deletedBookDocument);
        }

        return deletedBook;
    }

    public async isBookAvailable(id: string): Promise<boolean> {
        const bookModel: BookModel = await this.getById(id);

        const isBookAvailable: boolean = bookModel.isDeleted != null && !bookModel.isDeleted;

        return isBookAvailable;
    }
}
