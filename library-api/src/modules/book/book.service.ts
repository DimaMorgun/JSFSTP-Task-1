import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';

@Injectable()
export class BookService {
    public getBookById(id: string): Observable<string> {
        const book: string = `Book with id=${id}.`;

        return of(book);
    }

    public getBookList(): Observable<string[]> {
        const books: string[] = ['Book 1', 'Book 2', 'Book 3'];

        return of(books);
    }

    public createBook(createBookDto: CreateBookDto): Observable<CreateBookDto> {
        const createdBook: CreateBookDto = createBookDto;

        return of(createdBook);
    }

    public updateBook(updateBookDto: UpdateBookDto): Observable<UpdateBookDto> {
        const updatedBook: UpdateBookDto = updateBookDto;

        return of(updatedBook);
    }

    public deleteBook(id: string): Observable<boolean> {
        const isDeleted: boolean = true;

        return of(isDeleted);
    }
}
