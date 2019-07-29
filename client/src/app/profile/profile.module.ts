import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from 'src/app/profile/profile-routing.module';

import { AccountProfileComponent } from 'src/app/profile/account-profile/account-profile.component';
import { AdminComponent } from 'src/app/profile/admin/admin.component';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [AccountProfileComponent, AdminComponent, ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
