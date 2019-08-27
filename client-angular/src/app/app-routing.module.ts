import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import {
    LayoutGeneralComponent,
    PageNotFoundComponent,
} from 'src/app/shared/components';

const routes: Routes = [
    {
        path: 'auth',
        component: LayoutGeneralComponent,
        loadChildren: () => import('src/app/auth/auth.module').then(mod => mod.AuthModule),
    },
    {
        path: 'profile',
        component: LayoutGeneralComponent,
        loadChildren: () => import('src/app/profile/profile.module').then(mod => mod.ProfileModule),
    },
    {
        path: 'library',
        component: LayoutGeneralComponent,
        loadChildren: () => import('src/app/library/library.module').then(mod => mod.LibraryModule),
    },
    {
        path: '',
        redirectTo: 'library',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: LayoutGeneralComponent,
        children: [
            {
                path: '**',
                component: PageNotFoundComponent,
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
