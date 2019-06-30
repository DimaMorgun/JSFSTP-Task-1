import { Controller, Get, Param, Delete, Post, Put, Body } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get(':id')
    public getBookById(@Param('id') id: string): Observable<string> {
        const book: Observable<string> = this.bookService.getBookById(id);

        return book;
    }

    @Get()
    public getBookList(): Observable<string[]> {
        const books: Observable<string[]> = this.bookService.getBookList();

        return books;
    }

    @Put()
    public createBook(@Body() createBookDto: CreateBookDto): Observable<CreateBookDto> {
        const createdBook: Observable<CreateBookDto> = this.bookService.createBook(createBookDto);

        return createdBook;
    }

    @Post()
    public updateBook(@Body() updateBookDto: UpdateBookDto): Observable<UpdateBookDto> {
        const updatedBook: Observable<UpdateBookDto> = this.bookService.updateBook(updateBookDto);

        return updatedBook;
    }

    @Delete(':id')
    public deleteBook(@Param('id') id: string): Observable<boolean> {
        const isDeleted: Observable<boolean> = this.bookService.deleteBook(id);

        return isDeleted;
    }
}
