import { Controller, Get, Param, Delete, Post, Put, Body, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { BookModel, CreateBookModel, UpdateBookModel, FilterBookModel } from 'src/models';
import { BookService } from 'src/services';
import { BookDocument } from 'src/documents';

@Controller('book')
@ApiUseTags('book')
export class BookController {
    constructor(
        private readonly bookService: BookService,
    ) { }

    @Get('filter')
    public async getFilteredBookList(@Query() filterModel: FilterBookModel): Promise<BookDocument[]> {
        const books: BookDocument[] = await this.bookService.getFilteredList(filterModel);

        return books;
    }

    @Get(':id')
    public async getBookById(@Param('id') id: string): Promise<BookModel> {
        const book: BookModel = await this.bookService.getById(id);

        return book;
    }

    @Get(':skip/:limit')
    public async getBookListWithPaging(@Param('skip') skip: string, @Param('limit') limit: string): Promise<BookModel[]> {
        const books: BookModel[] = await this.bookService.getPaginated(+skip, +limit);

        return books;
    }

    @Get()
    public async getBookList(): Promise<BookDocument[]> {
        const books: BookDocument[] = await this.bookService.getList();

        return books;
    }

    @Post()
    public async createBook(@Body() createBookModel: CreateBookModel): Promise<BookModel> {
        const createdBook: BookModel = await this.bookService.create(createBookModel);

        return createdBook;
    }

    @Put()
    public async updateBook(@Body() updateBookModel: UpdateBookModel): Promise<BookModel> {
        const updatedBook: BookModel = await this.bookService.update(updateBookModel);

        return updatedBook;
    }

    @Delete(':id')
    public async deleteBook(@Param('id') id: string): Promise<BookModel> {
        const isDeleted: BookModel = await this.bookService.delete(id);

        return isDeleted;
    }
}
