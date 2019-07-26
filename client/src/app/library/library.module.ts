import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from 'src/app/library/library-routing.module';

import { BookComponent } from 'src/app/library/book/book.component';
import { HomeComponent } from 'src/app/library/home/home.component';
import { LibraryComponent } from 'src/app/library/library.component';

@NgModule({
  declarations: [
    LibraryComponent,
    BookComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
  ],
})
export class LibraryModule { }
