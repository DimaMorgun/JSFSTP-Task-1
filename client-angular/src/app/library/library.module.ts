import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';

import { LibraryRoutingModule } from 'src/app/library/library-routing.module';

import { BookComponent } from 'src/app/library/book/book.component';
import { HomeComponent } from 'src/app/library/home/home.component';
import { LibraryComponent } from 'src/app/library/library.component';
import { EditBookComponent } from 'src/app/library/edit-book/edit-book.component';
import { EditAuthorComponent } from 'src/app/library/edit-author/edit-author.component';
import { AuthorComponent } from 'src/app/library/author/author.component';
import { CartComponent } from 'src/app/library/cart/cart.component';

@NgModule({
  imports: [
    CommonModule,
    LibraryRoutingModule,
    AngularFontAwesomeModule,
    AngularMultiSelectModule,
    FormsModule,
  ],
  declarations: [
    LibraryComponent,
    BookComponent,
    HomeComponent,
    EditBookComponent,
    EditAuthorComponent,
    AuthorComponent,
    CartComponent,
  ],
})
export class LibraryModule { }
