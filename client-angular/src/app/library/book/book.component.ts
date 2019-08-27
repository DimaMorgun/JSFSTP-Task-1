import {
    Component,
    OnDestroy,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { BookService, CartService, AuthService } from 'src/app/services';

import { BookModel, BookFilterModel } from 'src/app/shared/models';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnDestroy {
    public allBooks: BookModel[] = new Array<BookModel>();
    public paginatedBooks: BookModel[] = new Array<BookModel>();
    public booksInCartIdList: string[] = new Array<string>();
    public isAuthenticated = false;

    public nameFilter: string;
    public priceFromFilter: number;
    public priceToFilter: number;
    public typeFilter: string;

    public page = 0;
    private limit = 5;

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

    public async removeBookFromCart(bookModel: BookModel): Promise<void> {
        await this.cartService.removeBookFromCart(bookModel);
    }

    public isBookInCart(bookModel: BookModel): boolean {
        const isBookInCart: boolean = this.booksInCartIdList.includes(bookModel.id);

        return isBookInCart;
    }

    public async filterOptionUpdated(): Promise<void> {
        const bookFilterModel: BookFilterModel = {};

        if (this.nameFilter && this.nameFilter.trim()) {
            bookFilterModel.name = this.nameFilter;
        }
        if (this.priceFromFilter > 0) {
            bookFilterModel.priceFrom = this.priceFromFilter;
        }
        if (this.priceToFilter > 0) {
            bookFilterModel.priceTo = this.priceToFilter;
        }
        if (this.typeFilter) {
            bookFilterModel.type = this.typeFilter;
        }

        this.allBooks = await this.bookService.getFilteredBooks(bookFilterModel);

        await this.clearPagingOptions();
    }

    public async clearPagingOptions(): Promise<void> {
        this.page = 0;

        await this.getPaginatedBooks(this.page);
    }

    public async getPaginatedBooks(page: number): Promise<void> {
        const startIndex: number = page * this.limit;
        const endIndex: number = startIndex + this.limit;
        const paginatedBooks: BookModel[] = this.allBooks.slice(startIndex, endIndex);

        if (this.allBooks && this.allBooks.length === 0) {
            this.paginatedBooks = this.allBooks;
            return;
        }

        if (paginatedBooks && paginatedBooks.length > 0) {
            this.page = page;
            this.paginatedBooks = paginatedBooks;
        }
    }

    public hasContent(): boolean {
        const hasBookContent: boolean = (this.allBooks && this.allBooks.length > 0);

        return hasBookContent;
    }

    private async initialize(): Promise<void> {
        this.allBooks = await this.bookService.getBooks();
        await this.getPaginatedBooks(this.page);
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
