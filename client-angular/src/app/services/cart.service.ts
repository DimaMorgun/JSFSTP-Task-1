import { Injectable, OnDestroy } from '@angular/core';

import { BookModel, UserModel } from 'src/app/shared/models';

import { Subscription, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class CartService implements OnDestroy {
    public cartAddSubject: Subject<BookModel>;
    public cartRemoveSubject: Subject<BookModel>;

    private authSubscription: Subscription;

    private clientId: string;

    constructor(
        private authService: AuthService,
    ) {
        this.cartAddSubject = new Subject<BookModel>();
        this.cartRemoveSubject = new Subject<BookModel>();

        this.initializeCurrentClientId();
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }

    public async addBookToCart(bookModel: BookModel): Promise<void> {
        let books: BookModel[] = new Array<BookModel>();
        const booksFromStorage: string = localStorage.getItem(`book-cart-${this.clientId}`);

        if (booksFromStorage) {
            books = JSON.parse(booksFromStorage) as BookModel[];
        }

        books.push(bookModel);
        const booksToStorage: string = JSON.stringify(books);
        localStorage.setItem(`book-cart-${this.clientId}`, booksToStorage);

        this.cartAddSubject.next(bookModel);
    }

    public async removeBookFromCart(bookModel: BookModel): Promise<void> {
        let books: BookModel[] = new Array<BookModel>();
        const booksFromStorage: string = localStorage.getItem(`book-cart-${this.clientId}`);

        if (booksFromStorage) {
            books = JSON.parse(booksFromStorage) as BookModel[];
        }

        books = books.filter(bookObject => bookObject.id !== bookModel.id);
        const booksToStorage: string = JSON.stringify(books);
        localStorage.setItem(`book-cart-${this.clientId}`, booksToStorage);

        this.cartRemoveSubject.next(bookModel);
    }

    public async getBooksFromCart(): Promise<BookModel[]> {
        let books: BookModel[] = Array<BookModel>();
        const booksFromStorage: string = localStorage.getItem(`book-cart-${this.clientId}`);

        if (booksFromStorage) {
            books = JSON.parse(booksFromStorage) as BookModel[];
        }

        return books;
    }

    public async getBookIdListFromCart(): Promise<string[]> {
        let books: BookModel[] = Array<BookModel>();
        const booksFromStorage: string = localStorage.getItem(`book-cart-${this.clientId}`);
        let bookIdList: string[] = Array<string>();

        if (booksFromStorage) {
            books = JSON.parse(booksFromStorage) as BookModel[];
            bookIdList = books.map(x => x.id);
        }

        return bookIdList;
    }

    public clearCart(): void {
        localStorage.removeItem(`book-cart-${this.clientId}`);
    }

    private initializeCurrentClientId(): void {
        this.authSubscription = this.authService.currentUserSubject.subscribe(data => {
            if (data) {
                this.clientId = data.id;
            }
            if (!data) {
                this.clientId = null;
            }
        });

        const currentUser: UserModel = this.authService.getUserSession();
        if (currentUser) {
            this.clientId = currentUser.id;
        }
    }
}
