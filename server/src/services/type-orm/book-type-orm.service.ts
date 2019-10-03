
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from 'dist/entities/book.entity';

@Injectable()
export class BookTypeORMService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,
    ) { }

    public async getList(): Promise<BookEntity[]> {
        const books: BookEntity[] = await this.bookRepository.find();

        return books;
    }

    public async create(): Promise<BookEntity> {
        const book: BookEntity = new BookEntity();
        book.name = 'TestName';
        book.price = 250;
        book.type = 'BOOK';
        book.createdDate = new Date();
        book.updatedDate = new Date();
        book.isDeleted = false;

        const newbook: BookEntity = await this.bookRepository.save(book);

        return newbook;
    }
}
