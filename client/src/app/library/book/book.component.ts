import {
  Component,
  OnInit,
} from '@angular/core';

import { BookService } from 'src/app/services/book.service';

import { BookModel } from 'src/app/shared/models';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {

  public books: BookModel[];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.initialize();
  }

  private async initialize() {
    this.books = await this.bookService.getBooks();
  }
}
