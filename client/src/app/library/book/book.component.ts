import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { BookService, CartService } from 'src/app/services';

import { BookModel } from 'src/app/shared/models';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {
  public books: BookModel[];
  public booksInCart: BookModel[];

  private cartSubscription: Subscription;

  constructor(
    private bookService: BookService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  public addBookToCart(bookModel: BookModel) {
    this.cartService.addBookToCart(bookModel);
  }

  private async initialize() {
    this.books = await this.bookService.getBooks();
    this.booksInCart = await this.cartService.getBooksFromCart();

    this.cartSubscription = this.cartService.cartAddSubject.subscribe(book => {
      if (book) {
        this.booksInCart.push(book);
      }
    });
  }
}
