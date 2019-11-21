import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import {
    LayoutGeneralComponent,
    PageNotFoundComponent,
} from 'src/app/shared/components';
import { VncTestLayoutComponent } from './shared/components/vnc-test-layout/vnc-test-layout.component';

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
        path: 'vnc-test',
        component: VncTestLayoutComponent,
        loadChildren: () => import('src/app/vnc-test/vnc-test.module').then(mod => mod.VncTestModule),
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
