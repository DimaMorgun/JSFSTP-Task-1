import { Controller, Get, Param, Delete, Post, Put, Body } from '@nestjs/common';

import { BookModel, CreateBookModel, UpdateBookModel } from 'src/models';
import { BookService } from 'src/services';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get(':id')
    async getBookById(@Param('id') id: string): Promise<BookModel> {
        const book: BookModel = await this.bookService.getBookById(id);

        return book;
    }

    @Get(':skip/:limit')
    async getBookListWithPaging(@Param('skip') skip: string, @Param('limit') limit: string): Promise<BookModel[]> {
        const books: BookModel[] = await this.bookService.getBookListWithPaging(+skip, +limit);

        return books;
    }

    @Get()
    async getBookList(): Promise<BookModel[]> {
        const books: BookModel[] = await this.bookService.getBookList();

        return books;
    }

    @Post()
    async createBook(@Body() createBookModel: CreateBookModel): Promise<BookModel> {
        const createdBook: BookModel = await this.bookService.createBook(createBookModel);

        return createdBook;
    }

    @Put()
    async updateBook(@Body() updateBookModel: UpdateBookModel): Promise<BookModel> {
        const updatedBook: BookModel = await this.bookService.updateBook(updateBookModel);

        return updatedBook;
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string): Promise<BookModel> {
        const isDeleted: BookModel = await this.bookService.deleteBook(id);

        return isDeleted;
    }
}
