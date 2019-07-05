import { Component, OnInit } from '@angular/core';

import { BookService } from 'src/app/core/services/book.service';
import { Book } from 'src/app/core/entities';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {

  public books: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe(data => {
      console.log(data);
      this.books = data;
    });
  }
}
