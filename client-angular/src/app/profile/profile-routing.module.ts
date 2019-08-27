import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from 'src/app/profile/profile.component';
import { AdminProfileComponent } from 'src/app/profile/admin-profile/admin-profile.component';
import { ClientProfileComponent } from 'src/app/profile/client-profile/client-profile.component';
import { EditProfileComponent } from 'src/app/profile/edit-profile/edit-profile.component';

import { AuthGuard } from 'src/app/core';

import { UserRole } from 'src/app/shared/models';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'client-profile',
        pathMatch: 'full',
    },
    {
        path: '',
        component: ProfileComponent,
        children: [
            {
                path: 'client-profile',
                component: ClientProfileComponent,
            },
            {
                path: 'admin-profile',
                canActivate: [AuthGuard],
                data: { roles: [UserRole.Admin] },
                component: AdminProfileComponent,
            },
            {
                path: 'edit-profile',
                canActivate: [AuthGuard],
                data: { roles: [UserRole.Admin] },
                component: EditProfileComponent,
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
