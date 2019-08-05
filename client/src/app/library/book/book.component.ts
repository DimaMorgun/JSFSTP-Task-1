import {
    Component,
    OnDestroy,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { BookService, CartService, AuthService } from 'src/app/services';

import { BookModel, UserModel } from 'src/app/shared/models';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnDestroy {
    public books: BookModel[] = new Array<BookModel>();
    public booksInCartIdList: string[] = new Array<string>();
    public isAuthenticated = false;

    private cartAddBookSubscription: Subscription;
    private cartRemoveBookSubscription: Subscription;

    constructor(
        private authService: AuthService,
        private bookService: BookService,
        private cartService: CartService,
    ) {
        this.initialize();
    }

    ngOnDestroy(): void {
        this.cartAddBookSubscription.unsubscribe();
        this.cartRemoveBookSubscription.unsubscribe();
    }

    public addBookToCart(bookModel: BookModel): void {
        this.cartService.addBookToCart(bookModel);
    }

    public removeBookFromCart(bookModel: BookModel): void {
        this.cartService.removeBookFromCart(bookModel);
    }

    public isBookInCart(bookModel: BookModel): boolean {
        const isBookInCart: boolean = this.booksInCartIdList.includes(bookModel.id);

        return isBookInCart;
    }

    private async initialize(): Promise<void> {
        this.books = await this.bookService.getBooks();
        this.booksInCartIdList = await this.cartService.getBookIdListFromCart();

        this.cartAddBookSubscription = this.cartService.cartAddSubject.subscribe(book => {
            if (book) {
                this.booksInCartIdList.push(book.id);
            }
        });
        this.cartRemoveBookSubscription = this.cartService.cartRemoveSubject.subscribe(book => {
            if (book) {
                this.booksInCartIdList = this.booksInCartIdList.filter(bookId => bookId !== book.id);
            }
        });

        this.isAuthenticated = this.authService.isUserAuthenticated();
    }
}
