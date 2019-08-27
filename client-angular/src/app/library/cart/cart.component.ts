import { Component } from '@angular/core';

import { BookService, CartService } from 'src/app/services';

import { BookModel, BookFilterModel } from 'src/app/shared/models';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {
    public books: BookModel[] = new Array<BookModel>();
    public amount: number;
    public purchasePopupMessage: string;

    public purchaseCompletedSuccessfully = false;

    constructor(
        private bookService: BookService,
        private cartService: CartService,
    ) {
        this.initialize();
    }

    public async removeBookFromCart(bookModel: BookModel): Promise<void> {
        await this.cartService.removeBookFromCart(bookModel);

        await this.reinitialize();
    }

    public async purchase() {
        this.cartService.clearCart();

        this.showPurchasePopup();

        await this.reinitialize();
    }

    private async reinitialize(): Promise<void> {
        this.books = new Array<BookModel>();

        await this.initialize();
    }

    private async initialize(): Promise<void> {
        const bookFilterModel: BookFilterModel = {};
        bookFilterModel.idList = await this.cartService.getBookIdListFromCart();

        if (bookFilterModel && bookFilterModel.idList.length > 0) {
            this.books = await this.bookService.getFilteredBooks(bookFilterModel);
        }

        this.getAmount();
    }

    private getAmount(): void {
        this.amount = 0;
        this.books.forEach(book => this.amount += book.price);
        if (this.amount === 0) {
            return;
        }
    }

    private showPurchasePopup(): void {
        this.purchasePopupMessage = `Successfully bought\nfor the amount of\n${this.amount} $.`;

        setTimeout(() => {
            this.purchasePopupMessage = '';
        }, (5000));
    }
}
