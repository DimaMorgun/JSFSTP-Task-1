import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from 'src/app/library/library-routing.module';

import { BookComponent } from 'src/app/library/book/book.component';
import { HomeComponent } from 'src/app/library/home/home.component';
import { LibraryComponent } from 'src/app/library/library.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { AuthorComponent } from './author/author.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    LibraryComponent,
    BookComponent,
    HomeComponent,
    EditBookComponent,
    EditAuthorComponent,
    AuthorComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
  ],
})
export class LibraryModule { }
