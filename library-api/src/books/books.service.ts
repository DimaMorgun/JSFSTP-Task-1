import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as IBook from './interfaces/book.interface';
import * as Entity from 'src/entities/book';

@Injectable()
export class BooksService {
    private uuidv4 = require('uuid/v4');

    constructor(@InjectModel('Book') private readonly bookModel: Model<IBook.Book>) { }

    async getBookList(): Promise<IBook.Book[]> {
        const bookList: Promise<IBook.Book[]> = await this.bookModel.find().exec();

        return bookList;
    }

    async getBook(id: string): Promise<IBook.Book> {
        const book: Promise<IBook.Book> = await this.bookModel.find({ id }).exec();

        return book;
    }

    async createBook(createBookDto: CreateBookDto): Promise<IBook.Book> {
        const book: Entity.Book = new Entity.Book();
        book.id = this.uuidv4();
        book.name = createBookDto.name;
        book.authorName = createBookDto.authorName;
        book.created = new Date();
        book.updated = new Date();

        const createdBook = new this.bookModel(book);
        const result: Promise<IBook.Book> = await createdBook.save();

        return result;
    }
}
