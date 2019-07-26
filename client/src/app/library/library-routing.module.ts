import {
    Routes,
    RouterModule,
} from '@angular/router';
import { NgModule } from '@angular/core';

import { BookComponent } from 'src/app/library/book/book.component';
import { HomeComponent } from 'src/app/library/home/home.component';
import { LibraryComponent } from 'src/app/library/library.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: '',
        component: LibraryComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'book',
                component: BookComponent,
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LibraryRoutingModule { }
