import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { LibraryModule } from 'src/app/library/library.module';

import { AppComponent } from 'src/app/app.component';
import {
  LayoutDefaultComponent,
  NavHeaderComponent,
  SidebarComponent,
  FooterComponent,
  PageNotFoundComponent,
} from 'src/app/shared/components';

import {
  AuthService,
  BookService,
} from 'src/app/services';


@NgModule({
  declarations: [
    AppComponent,
    LayoutDefaultComponent,
    NavHeaderComponent,
    SidebarComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    LibraryModule,
  ],
  providers: [
    AuthService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
