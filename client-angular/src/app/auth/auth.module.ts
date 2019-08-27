import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';

import { LoginComponent } from 'src/app/auth/login/login.component';
import { SingUpComponent } from 'src/app/auth/sign-up/sing-up.component';
import { AuthComponent } from 'src/app/auth/auth.component';

@NgModule({
  declarations: [
    LoginComponent,
    SingUpComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
  ]
})
export class AuthModule { }
