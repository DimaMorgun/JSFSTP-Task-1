import { CreateBookDto } from "../dtos/create-book.dto";
import { Observable, of } from "rxjs";
import { Book } from "../entities/book.entity";

export class BookFactory {
    public getBook(createBookDto: CreateBookDto): Observable<Book> {
        const createBook = new Book();
        createBook.name = createBookDto.name;
        createBook.authorName = createBookDto.authorName;
        createBook.imageSrc = createBookDto.imageSrc;
        createBook.created = new Date();
        createBook.updated = new Date();
        createBook.isDeleted = false;

        return of(new Book());
    }
}
