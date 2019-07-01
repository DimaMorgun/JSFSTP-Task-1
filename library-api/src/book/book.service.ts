import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Observable, of } from 'rxjs';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import * as Interfaces from './interfaces/book.interface';
import * as Models from './models/book.model';

@Injectable()
export class BookService {
    constructor(@Inject('BOOK_MODEL') private readonly bookModel: Model<Interfaces.Book>) { }

    public getBookById(id: string): Observable<Interfaces.Book> {
        const objectId = require('mongoose').Types.ObjectId;
        const isValidId = objectId.isValid(id);

        let book: Interfaces.Book = new Models.Book();
        if (isValidId) {
            book = this.bookModel.findById(id).exec();
        }

        return of(book);
    }

    public getBookList(): Observable<Interfaces.Book[]> {
        const books: Interfaces.Book[] = this.bookModel.find().exec();

        return of(books);
    }

    public getBookListWithPaging(skip: number, limit: number): Observable<Interfaces.Book[]> {
        const books: Interfaces.Book[] = this.bookModel.find().skip(skip).limit(limit).exec();

        return of(books);
    }

    public createBook(createBookDto: CreateBookDto): Observable<Interfaces.Book> {
        const createBook = new Models.Book();
        createBook.name = createBookDto.name;
        createBook.authorName = createBookDto.authorName;
        createBook.imageSrc = createBookDto.imageSrc;
        createBook.created = new Date();
        createBook.updated = new Date();
        createBook.isDeleted = false;

        const createdBook: Model<Interfaces.Book> = new this.bookModel(createBook);
        const newBook: Interfaces.Book = createdBook.save();

        return of(newBook);
    }

    public updateBook(updateBookDto: UpdateBookDto): Observable<Interfaces.Book> {
        const updateBook = new Models.Book();
        updateBook.name = updateBookDto.name;
        updateBook.authorName = updateBookDto.authorName;
        updateBook.imageSrc = updateBookDto.imageSrc;
        updateBook.updated = new Date();
        updateBook.isDeleted = false;

        const updatedBook: Interfaces.Book = this.bookModel.findByIdAndUpdate(updateBookDto.id, updateBookDto);

        return of(updatedBook);
    }

    public deleteBook(id: string): Observable<Interfaces.Book> {
        const deletedBook: Interfaces.Book = this.bookModel.findByIdAndRemove(id);

        return of(deletedBook);
    }
}
