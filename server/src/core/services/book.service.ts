import { Injectable } from '@nestjs/common';

import { Book, CreateBookModel, UpdateBookModel } from 'src/core/models';
import { BookRepository } from 'src/core/repositories/book-repository';

@Injectable()
export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
    ) { }

    async getBookById(id: string): Promise<Book> {
        const objectId = require('mongoose').Types.ObjectId;
        const isValidId = objectId.isValid(id);

        let book: Book = {} as Book;
        if (isValidId) {
            book = await this.bookRepository.getById(id);
        }

        return book;
    }

    async getBookList(): Promise<Book[]> {
        const books: Book[] = await this.bookRepository.getAll();

        return books;
    }

    async getBookListWithPaging(skip: number, limit: number): Promise<Book[]> {
        const books: Book[] = await this.bookRepository.getPaginated(skip, limit);

        return books;
    }

    async createBook(createBookModel: CreateBookModel): Promise<Book> {
        const createBook = {} as Book;
        createBook.name = createBookModel.name;
        createBook.authorName = createBookModel.authorName;
        createBook.imageSrc = createBookModel.imageSrc;
        createBook.created = new Date();
        createBook.updated = new Date();
        createBook.isDeleted = false;

        const newBook: Book = await this.bookRepository.create(createBook);

        return newBook;
    }

    async updateBook(updateBookModel: UpdateBookModel): Promise<Book> {
        const updateBook = {} as Book;
        updateBook.id = updateBookModel.id;
        updateBook.name = updateBookModel.name;
        updateBook.authorName = updateBookModel.authorName;
        updateBook.imageSrc = updateBookModel.imageSrc;
        updateBook.updated = new Date();
        updateBook.isDeleted = false;

        const updatedBook: Book = await this.bookRepository.update(updateBook);

        return updatedBook;
    }

    async deleteBook(id: string): Promise<Book> {
        const deletedBook: Book = await this.bookRepository.delete(id);

        return deletedBook;
    }
}
