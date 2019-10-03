import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { BookTypeORMService } from 'src/services/type-orm/book-type-orm.service';
import { BookEntity } from 'src/entities/book.entity';

@Controller('book-type-orm')
@ApiUseTags('book-type-orm')
export class BookTypeORMController {
    constructor(
        private readonly bookService: BookTypeORMService,
    ) { }

    @Get()
    public async getBookList(): Promise<BookEntity[]> {
        const books: BookEntity[] = await this.bookService.getList();

        return books;
    }

    @Post()
    public async createBook(): Promise<BookEntity> {
        const createdBook: BookEntity = await this.bookService.create();

        return createdBook;
    }
}
