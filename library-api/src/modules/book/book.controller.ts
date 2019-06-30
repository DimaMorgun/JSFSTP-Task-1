import { Controller, Get, Param, Delete, Post, Put, Body } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { BookService } from './book.service';
import { Book } from './interfaces/book.interface';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get(':id')
    public getBookById(@Param('id') id: string): Observable<Book> {
        const book: Observable<Book> = this.bookService.getBookById(id);

        return book;
    }

    @Get()
    public getBookList(): Observable<Book[]> {
        const books: Observable<Book[]> = this.bookService.getBookList();

        return books;
    }

    @Post()
    public createBook(@Body() createBookDto: CreateBookDto): Observable<Book> {
        const createdBook: Observable<Book> = this.bookService.createBook(createBookDto);

        return createdBook;
    }

    @Put()
    public updateBook(@Body() updateBookDto: UpdateBookDto): Observable<Book> {
        const updatedBook: Observable<Book> = this.bookService.updateBook(updateBookDto);

        return updatedBook;
    }

    @Delete(':id')
    public deleteBook(@Param('id') id: string): Observable<Book> {
        const isDeleted: Observable<Book> = this.bookService.deleteBook(id);

        return isDeleted;
    }
}
