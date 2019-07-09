import { Injectable } from '@nestjs/common';

import { ObjectId } from 'mongoose';

import { BookRepository } from 'src/repositories';
import { BookModel, CreateBookModel, UpdateBookModel } from 'src/models';
import { BookDocument } from 'src/documents';

@Injectable()
export class BookService {
    constructor(private readonly bookRepository: BookRepository) { }

    async getBookById(id: string): Promise<BookModel> {
        const isValidId = ObjectId.isValid(id);

        let book: BookModel = {};
        if (isValidId) {
            book = await this.bookRepository.getById(id);
        }

        return book;
    }

    async getBookList(): Promise<BookModel[]> {
        const books: BookModel[] = await this.bookRepository.getAll();

        return books;
    }

    async getBookListWithPaging(skip: number, limit: number): Promise<BookModel[]> {
        const books: BookModel[] = await this.bookRepository.getPaginated(skip, limit);

        return books;
    }

    async createBook(createBookModel: CreateBookModel): Promise<BookModel> {
        const createBook: BookDocument = {};
        createBook.name = createBookModel.name;
        createBook.createdDate = new Date();
        createBook.updatedDate = new Date();
        createBook.isDeleted = false;

        const newBook: BookModel = await this.bookRepository.create(createBook);

        return newBook;
    }

    async updateBook(updateBookModel: UpdateBookModel): Promise<BookModel> {
        const updateBook: BookDocument = {};
        updateBook._id = updateBookModel.id;
        updateBook.name = updateBookModel.name;
        updateBook.updatedDate = new Date();
        updateBook.isDeleted = false;

        const updatedBook: BookModel = await this.bookRepository.update(updateBook);

        return updatedBook;
    }

    async deleteBook(id: string): Promise<BookModel> {
        const deletedBook: BookModel = await this.bookRepository.delete(id);

        return deletedBook;
    }
}
