import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { LibraryModule } from 'src/app/library/library.module';
import { ProfileModule } from 'src/app/profile/profile.module';

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

import { JwtInterceptor, ErrorInterceptor } from 'src/app/core';


@NgModule({
  declarations: [
    AppComponent,
    LayoutDefaultComponent,
    NavHeaderComponent,
    SidebarComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    LibraryModule,
    ProfileModule,
  ],
  providers: [
    AuthService,
    BookService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
