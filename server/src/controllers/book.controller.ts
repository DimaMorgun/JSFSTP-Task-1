import { Controller, Get, Param, Delete, Post, Put, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { BookModel, CreateBookModel, UpdateBookModel } from 'src/models';
import { BookService } from 'src/services';
import { BookDocument } from 'src/documents';

@Controller('book')
@ApiUseTags('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get(':id')
    async getBookById(@Param('id') id: string): Promise<BookModel> {
        const book: BookModel = await this.bookService.getById(id);

        return book;
    }

    @Get(':skip/:limit')
    async getBookListWithPaging(@Param('skip') skip: string, @Param('limit') limit: string): Promise<BookModel[]> {
        const books: BookModel[] = await this.bookService.getPaginated(+skip, +limit);

        return books;
    }

    @Get()
    async getBookList(): Promise<BookDocument[]> {
        const books: BookDocument[] = await this.bookService.getList();

        return books;
    }

    @Post()
    async createBook(@Body() createBookModel: CreateBookModel): Promise<BookModel> {
        const createdBook: BookModel = await this.bookService.create(createBookModel);

        return createdBook;
    }

    @Put()
    async updateBook(@Body() updateBookModel: UpdateBookModel): Promise<BookModel> {
        const updatedBook: BookModel = await this.bookService.update(updateBookModel);

        return updatedBook;
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string): Promise<BookModel> {
        const isDeleted: BookModel = await this.bookService.delete(id);

        return isDeleted;
    }
}
