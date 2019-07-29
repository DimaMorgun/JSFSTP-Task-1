import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountProfileComponent } from 'src/app/profile/account-profile/account-profile.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { AdminComponent } from 'src/app/profile/admin/admin.component';

import { AuthGuard } from 'src/app/core';

import { UserRole } from 'src/app/shared/models';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'account-profile',
        pathMatch: 'full',
    },
    {
        path: '',
        component: ProfileComponent,
        children: [
            {
                path: 'account-profile',
                component: AccountProfileComponent,
            },
            {
                path: 'admin',
                canActivate: [AuthGuard],
                data: { roles: [UserRole.Admin] },
                component: AdminComponent,
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
