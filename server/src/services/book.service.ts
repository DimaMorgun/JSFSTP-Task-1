import { Injectable } from '@nestjs/common';

import { Types } from 'mongoose';

import { BookRepository } from 'src/repositories';
import { BookModel, CreateBookModel, UpdateBookModel } from 'src/models';
import { BookDocument } from 'src/documents';

@Injectable()
export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
    ) { }

    public async getById(id: string): Promise<BookModel> {
        const book: BookModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (!isValidId) {
            return book;
        }

        const bookDocument: BookDocument = await this.bookRepository.getById(id);
        if (bookDocument) {
            book.id = bookDocument._id;
            book.name = bookDocument.name;
            book.createdDate = bookDocument.createdDate;
            book.updatedDate = bookDocument.updatedDate;
            book.isDeleted = bookDocument.isDeleted;
        }

        return book;
    }

    public async getList(): Promise<BookModel[]> {
        const books: BookModel[] = new Array<BookModel>();

        const bookDocuments: BookDocument[] = await this.bookRepository.getAll();
        if (!bookDocuments || bookDocuments.length === 0) {
            return books;
        }

        for (const bookDocument of bookDocuments) {
            const bookModel: BookModel = {};
            bookModel.id = bookDocument._id;
            bookModel.name = bookDocument.name;
            bookModel.createdDate = bookDocument.createdDate;
            bookModel.updatedDate = bookDocument.updatedDate;
            bookModel.isDeleted = bookDocument.isDeleted;

            books.push(bookModel);
        }

        return books;
    }

    public async getPaginated(skip: number, limit: number): Promise<BookModel[]> {
        const books: BookModel[] = new Array<BookModel>();

        const bookDocuments: BookDocument[] = await this.bookRepository.getPaginated(skip, limit);
        if (!bookDocuments || bookDocuments.length === 0) {
            return books;
        }

        for (const bookDocument of bookDocuments) {
            const bookModel: BookModel = {};
            bookModel.id = bookDocument._id;
            bookModel.name = bookDocument.name;
            bookModel.createdDate = bookDocument.createdDate;
            bookModel.updatedDate = bookDocument.updatedDate;
            bookModel.isDeleted = bookDocument.isDeleted;

            books.push(bookModel);
        }

        return books;
    }

    public async create(createBookModel: CreateBookModel): Promise<BookModel> {
        const createdBook: BookModel = {};
        const createBookDocument: BookDocument = {};

        if (createBookModel) {
            createBookDocument.name = createBookModel.name;
            createBookDocument.createdDate = new Date();
            createBookDocument.updatedDate = new Date();
            createBookDocument.isDeleted = false;
        }

        const createdBookDocument: BookDocument = await this.bookRepository.create(createBookDocument);
        if (createdBookDocument) {
            createdBook.id = createdBookDocument._id;
            createdBook.name = createdBookDocument.name;
            createdBook.createdDate = createdBookDocument.createdDate;
            createdBook.updatedDate = createdBookDocument.updatedDate;
            createdBook.isDeleted = createdBookDocument.isDeleted;
        }

        return createdBook;
    }

    public async update(updateBookModel: UpdateBookModel): Promise<BookModel> {
        const updatedBook: BookModel = {};
        const updateBookDocument: BookDocument = {};

        if (updateBookModel) {
            updateBookDocument._id = updateBookModel.id;
            updateBookDocument.name = updateBookModel.name;
            updateBookDocument.updatedDate = new Date();
        }

        const updatedBookDocument: BookDocument = await this.bookRepository.update(updateBookDocument);
        if (updatedBookDocument) {
            updatedBook.id = updatedBookDocument._id;
            updatedBook.name = updatedBookDocument.name;
            updatedBook.createdDate = updatedBookDocument.createdDate;
            updatedBook.updatedDate = updatedBookDocument.updatedDate;
            updatedBook.isDeleted = updatedBookDocument.isDeleted;
        }

        return updatedBook;
    }

    public async delete(id: string): Promise<BookModel> {
        const deletedBook: BookModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (!isValidId) {
            return deletedBook;
        }

        const deletedBookDocument: BookDocument = await this.bookRepository.delete(id);
        if (deletedBookDocument) {
            deletedBook.id = deletedBookDocument._id;
            deletedBook.name = deletedBookDocument.name;
            deletedBook.createdDate = deletedBookDocument.createdDate;
            deletedBook.updatedDate = deletedBookDocument.updatedDate;
            deletedBook.isDeleted = deletedBookDocument.isDeleted;
        }

        return deletedBook;
    }

    public async isBookAvailable(id: string): Promise<boolean> {
        const bookModel: BookModel = await this.getById(id);

        const isBookAvailable: boolean = bookModel.isDeleted != null && !bookModel.isDeleted;

        return isBookAvailable;
    }
}
