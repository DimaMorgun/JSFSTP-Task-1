import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LibraryModule } from './library/library.module';

import { AppComponent } from './app.component';
import { LayoutDefaultComponent } from './shared/layout-default/layout-default.component';
import { NavHeaderComponent } from './shared/nav-header/nav-header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BookService } from './core/services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';


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
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    LibraryModule,
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
