import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import {
    LayoutDefaultComponent,
    PageNotFoundComponent,
} from 'src/app/shared/components';

const routes: Routes = [
    {
        path: 'auth',
        component: LayoutDefaultComponent,
        loadChildren: () => import('src/app/auth/auth.module').then(mod => mod.AuthModule),
    },
    {
        path: 'profile',
        component: LayoutDefaultComponent,
        loadChildren: () => import('src/app/profile/profile.module').then(mod => mod.ProfileModule),
    },
    {
        path: 'library',
        component: LayoutDefaultComponent,
        loadChildren: () => import('src/app/library/library.module').then(mod => mod.LibraryModule),
    },
    {
        path: '',
        redirectTo: 'library',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: LayoutDefaultComponent,
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
