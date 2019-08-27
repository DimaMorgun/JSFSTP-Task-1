import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { AuthComponent } from 'src/app/auth/auth.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SingUpComponent } from 'src/app/auth/sign-up/sing-up.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'sign-up',
                component: SingUpComponent,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }
