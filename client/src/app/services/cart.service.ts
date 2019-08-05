import { Injectable } from '@angular/core';

import { BookModel } from 'src/app/shared/models';

import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CartService {
    public cartAddSubject: BehaviorSubject<BookModel>;
    public cartRemoveSubject: BehaviorSubject<BookModel>;

    constructor() {
        this.cartAddSubject = new BehaviorSubject<BookModel>(null);
        this.cartRemoveSubject = new BehaviorSubject<BookModel>(null);
    }

    public async addBookToCart(bookModel: BookModel): Promise<void> {
        let books: BookModel[] = new Array<BookModel>();
        const booksFromStorage: string = localStorage.getItem('book-cart');

        if (booksFromStorage) {
            books = JSON.parse(booksFromStorage) as BookModel[];
        }

        books.push(bookModel);
        const booksToStorage: string = JSON.stringify(books);
        localStorage.setItem('book-cart', booksToStorage);

        this.cartAddSubject.next(bookModel);
    }

    public async removeBookFromCart(bookModel: BookModel): Promise<void> {
        let books: BookModel[] = new Array<BookModel>();
        const booksFromStorage: string = localStorage.getItem('book-cart');

        if (booksFromStorage) {
            books = JSON.parse(booksFromStorage) as BookModel[];
        }

        books = books.filter(bookObject => bookObject.id !== bookModel.id);
        const booksToStorage: string = JSON.stringify(books);
        localStorage.setItem('book-cart', booksToStorage);

        this.cartRemoveSubject.next(bookModel);
    }

    public async getBooksFromCart(): Promise<BookModel[]> {
        let books: BookModel[] = Array<BookModel>();
        const booksFromStorage: string = localStorage.getItem('book-cart');

        if (booksFromStorage) {
            books = JSON.parse(booksFromStorage) as BookModel[];
        }

        return books;
    }

    public async getBookIdListFromCart(): Promise<string[]> {
        let books: BookModel[] = Array<BookModel>();
        const booksFromStorage: string = localStorage.getItem('book-cart');
        let bookIdList: string[] = Array<string>();

        if (booksFromStorage) {
            books = JSON.parse(booksFromStorage) as BookModel[];
            bookIdList = books.map(x => x.id);
        }

        return bookIdList;
    }
}
