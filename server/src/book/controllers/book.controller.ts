import { Controller, Get, Param, Delete, Post, Put, Body } from '@nestjs/common';
import { Book, CreateBookModel, UpdateBookModel } from 'src/core/models';
import { BookService } from 'src/core/services';

@Controller('book')
export class BookController {
    constructor(
        private readonly bookService: BookService,
    ) { }

    @Get(':id')
    async getBookById(@Param('id') id: string): Promise<Book> {
        const book: Book = await this.bookService.getBookById(id);

        return book;
    }

    @Get(':skip/:limit')
    async getBookListWithPaging(@Param('skip') skip: string, @Param('limit') limit: string): Promise<Book[]> {
        const books: Book[] = await this.bookService.getBookListWithPaging(+skip, +limit);

        return books;
    }

    @Get()
    async getBookList(): Promise<Book[]> {
        const books: Book[] = await this.bookService.getBookList();

        return books;
    }

    @Post()
    async createBook(@Body() createBookDto: CreateBookModel): Promise<Book> {
        const createdBook: Book = await this.bookService.createBook(createBookDto);

        return createdBook;
    }

    @Put()
    async updateBook(@Body() updateBookDto: UpdateBookModel): Promise<Book> {
        const updatedBook: Book = await this.bookService.updateBook(updateBookDto);

        return updatedBook;
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string): Promise<Book> {
        const isDeleted: Book = await this.bookService.deleteBook(id);

        return isDeleted;
    }
}
