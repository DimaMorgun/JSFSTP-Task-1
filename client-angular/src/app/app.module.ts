import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { LibraryModule } from 'src/app/library/library.module';
import { ProfileModule } from 'src/app/profile/profile.module';
import { VncTestModule } from './vnc-test/vnc-test.module';

import { AppComponent } from 'src/app/app.component';
import {
  LayoutGeneralComponent,
  LayoutAdminComponent,
  LayoutClientComponent,
  AdminSidebarComponent,
  NavHeaderComponent,
  FooterComponent,
  PageNotFoundComponent,
} from 'src/app/shared/components';

import {
  AuthService,
  BookService,
  CartService,
  AuthorService,
} from 'src/app/services';

import { JwtInterceptor, ErrorInterceptor } from 'src/app/core';
import { VncTestLayoutComponent } from './shared/components/vnc-test-layout/vnc-test-layout.component'


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    AuthModule,
    LibraryModule,
    ProfileModule,
    VncTestModule,
  ],
  declarations: [
    AppComponent,
    LayoutGeneralComponent,
    LayoutAdminComponent,
    LayoutClientComponent,
    AdminSidebarComponent,
    NavHeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    VncTestLayoutComponent,

  ],
  providers: [
    AuthService,
    AuthorService,
    BookService,
    CartService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
