import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Observable, of } from 'rxjs';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import * as Interface from './interfaces/book.interface';
import * as Entity from './entities/book.entity';

@Injectable()
export class BookService {
    constructor(@Inject('BOOK_MODEL') private readonly bookModel: Model<Interface.Book>) { }

    public getBookById(id: string): Observable<Interface.Book> {
        const objectId = require('mongoose').Types.ObjectId;
        const isValidId = objectId.isValid(id);

        let book: Interface.Book = new Entity.Book();
        if (isValidId) {
            book = this.bookModel.findById(id).exec();
        }

        return of(book);
    }

    public getBookList(): Observable<Interface.Book[]> {
        const books: Interface.Book[] = this.bookModel.find().exec();

        return of(books);
    }

    public getBookListWithPaging(skip: number, limit: number): Observable<Interface.Book[]> {
        const books: Interface.Book[] = this.bookModel.find().skip(skip).limit(limit).exec();

        return of(books);
    }

    public createBook(createBookDto: CreateBookDto): Observable<Interface.Book> {
        const createBook = new Entity.Book();
        createBook.name = createBookDto.name;
        createBook.authorName = createBookDto.authorName;
        createBook.imageSrc = createBookDto.imageSrc;
        createBook.created = new Date();
        createBook.updated = new Date();
        createBook.isDeleted = false;

        const createdBook: Model<Interface.Book> = new this.bookModel(createBook);
        const newBook: Interface.Book = createdBook.save();

        return of(newBook);
    }

    public updateBook(updateBookDto: UpdateBookDto): Observable<Interface.Book> {
        const updateBook = new Entity.Book();
        updateBook.name = updateBookDto.name;
        updateBook.authorName = updateBookDto.authorName;
        updateBook.imageSrc = updateBookDto.imageSrc;
        updateBook.updated = new Date();
        updateBook.isDeleted = false;

        const updatedBook: Interface.Book = this.bookModel.findByIdAndUpdate(updateBookDto.id, updateBookDto);

        return of(updatedBook);
    }

    public deleteBook(id: string): Observable<Interface.Book> {
        const deletedBook: Interface.Book = this.bookModel.findByIdAndRemove(id);

        return of(deletedBook);
    }
}
