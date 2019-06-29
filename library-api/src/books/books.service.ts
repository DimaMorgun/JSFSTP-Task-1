import { Injectable } from '@nestjs/common';
import { Book } from 'src/entities/book';
import { CreateBookDto } from './dto/create-book.dto';
import { concat } from 'rxjs';

@Injectable()
export class BooksService {

    private books: Book[] = new Array<Book>();

    constructor() {
        for (let index = 0; index < 15; index++) {
            const book: Book = new Book();
            book.id = index.toString();
            book.name = `Book name ${index}`;
            book.authorName = `Author name Henrih ${index}`;
            book.created = new Date();
            book.updated = new Date();

            this.books.push(book);
        }
    }

    public getBookList(): Book[] {
        const bookList: Book[] = this.books;

        return bookList;
    }

    public getBook(id: string): Book {
        const book: Book = this.books.find(x => x.id === id);

        return book;
    }

    public createBook(createBookDto: CreateBookDto): boolean {
        const book: Book = new Book();
        book.id = (createBookDto.name + createBookDto.authorName).length.toString();
        book.name = createBookDto.name;
        book.authorName = createBookDto.authorName;
        book.created = new Date();
        book.updated = new Date();

        this.books.push(book);

        return true;
    }
}
