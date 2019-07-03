import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { LibraryRoutingModule } from './library-routing.module';

@NgModule({
  declarations: [BookComponent, HomeComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule
  ]
})
export class LibraryModule { }
