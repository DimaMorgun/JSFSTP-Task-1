import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from 'src/entities/book';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get()
    getBookList(): Promise<Book[]> {
        const books = this.booksService.getBookList();

        return books;
    }

    @Get(':id')
    getBook(@Param('id') id: string): Promise<Book> {
        const book = this.booksService.getBook(id);

        return book;
    }

    @Put()
    createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        const status = this.booksService.createBook(createBookDto);

        return status;
    }
}
