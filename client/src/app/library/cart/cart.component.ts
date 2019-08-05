import { Component } from '@angular/core';

import { BookService, CartService, AuthService } from 'src/app/services';

import { BookModel, UserModel } from 'src/app/shared/models';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {
    public books: BookModel[] = new Array<BookModel>();

    public purchaseCompletedSuccessfully = false;

    constructor(
        private bookService: BookService,
        private cartService: CartService,
    ) {
        this.initialize();
    }

    public async purchase() {
        let amount = 0;
        this.books.forEach(book => amount += book.price);
        if (amount === 0) {
            return;
        }

        this.cartService.clearCart();
        alert(`Successfully. You bought for the amount of ${amount}.`);
    }

    private async initialize(): Promise<void> {
        const booksInCartIdList: string[] = await this.cartService.getBookIdListFromCart();
        console.log(booksInCartIdList);

        for (const bookId of booksInCartIdList) {
            const book: BookModel = await this.bookService.getBookById(bookId);
            console.log(book);

            if (book) {
                this.books.push(book);
            }
        }
    }
}
