import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from 'src/app/profile/profile-routing.module';
import { ClientProfileComponent } from 'src/app/profile/client-profile/client-profile.component';
import { AdminProfileComponent } from 'src/app/profile/admin-profile/admin-profile.component';
import { EditProfileComponent } from 'src/app/profile/edit-profile/edit-profile.component';

@NgModule({
  declarations: [ProfileComponent, AdminProfileComponent, ClientProfileComponent, EditProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
