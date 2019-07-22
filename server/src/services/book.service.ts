import { Injectable } from '@nestjs/common';

import { Types, objectid } from 'mongoose';

import { BookRepository, AuthorRepository } from 'src/repositories';
import { BookModel, CreateBookModel, UpdateBookModel, FilterBookModel } from 'src/models';
import { BookDocument } from 'src/documents';

@Injectable()
export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
        private readonly authorRepository: AuthorRepository,
    ) { }

    public async getFilteredList(filterModel: FilterBookModel): Promise<BookModel[]> {
        const books: BookModel[] = new Array<BookModel>();

        const bookDocuments: BookDocument[] = await this.bookRepository.getFilteredList(filterModel);

        if (!bookDocuments || bookDocuments.length === 0) {
            return books;
        }

        for (const bookDocument of bookDocuments) {
            const bookModel: BookModel = {};
            bookModel.id = bookDocument._id;
            bookModel.name = bookDocument.name;
            bookModel.price = bookDocument.price;
            bookModel.type = bookDocument.type;
            bookModel.authors = bookDocument.authors;
            bookModel.createdDate = bookDocument.createdDate;
            bookModel.updatedDate = bookDocument.updatedDate;
            bookModel.isDeleted = bookDocument.isDeleted;

            books.push(bookModel);
        }

        return books;
    }

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
            book.price = bookDocument.price;
            book.type = bookDocument.type;
            book.authors = bookDocument.authors;
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
            bookModel.price = bookDocument.price;
            bookModel.type = bookDocument.type;
            bookModel.authors = bookDocument.authors;
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
            bookModel.price = bookDocument.price;
            bookModel.type = bookDocument.type;
            bookModel.authors = bookDocument.authors;
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

        const availableRelatedAuthorsIds: objectid[] = await this.authorRepository.getAwailableByIdList(createBookModel.authors);

        if (createBookModel) {
            createBookDocument.name = createBookModel.name;
            createBookDocument.price = createBookModel.price;
            createBookDocument.type = createBookModel.type;
            createBookDocument.authors = availableRelatedAuthorsIds;
            createBookDocument.createdDate = new Date();
            createBookDocument.updatedDate = new Date();
            createBookDocument.isDeleted = false;
        }

        const createdBookDocument: BookDocument = await this.bookRepository.create(createBookDocument);
        if (createdBookDocument) {
            createdBook.id = createdBookDocument._id;
            createdBook.name = createdBookDocument.name;
            createdBook.price = createdBookDocument.price;
            createdBook.type = createdBookDocument.type;
            createdBook.authors = createdBookDocument.authors;
            createdBook.createdDate = createdBookDocument.createdDate;
            createdBook.updatedDate = createdBookDocument.updatedDate;
            createdBook.isDeleted = createdBookDocument.isDeleted;
        }

        const x = await this.authorRepository.assingBook(availableRelatedAuthorsIds, createdBookDocument._id);

        return createdBook;
    }

    public async update(updateBookModel: UpdateBookModel): Promise<BookModel> {
        const updatedBook: BookModel = {};
        const updateBookDocument: BookDocument = {};

        if (updateBookModel) {
            updateBookDocument._id = updateBookModel.id;
            updateBookDocument.name = updateBookModel.name;
            updateBookDocument.price = updateBookModel.price;
            updateBookDocument.type = updateBookModel.type;
            updateBookDocument.authors = updateBookModel.authors;
            updateBookDocument.updatedDate = new Date();
        }

        const updatedBookDocument: BookDocument = await this.bookRepository.update(updateBookDocument);
        if (updatedBookDocument) {
            updatedBook.id = updatedBookDocument._id;
            updatedBook.name = updatedBookDocument.name;
            updatedBook.price = updatedBookDocument.price;
            updatedBook.type = updatedBookDocument.type;
            updatedBook.authors = updatedBookDocument.authors;
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
            deletedBook.price = deletedBookDocument.price;
            deletedBook.type = deletedBookDocument.type;
            deletedBook.authors = deletedBookDocument.authors;
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
