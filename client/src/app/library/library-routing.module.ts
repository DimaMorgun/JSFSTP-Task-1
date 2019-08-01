import {
    Routes,
    RouterModule,
} from '@angular/router';
import { NgModule } from '@angular/core';

import { BookComponent } from 'src/app/library/book/book.component';
import { HomeComponent } from 'src/app/library/home/home.component';
import { LibraryComponent } from 'src/app/library/library.component';
import { AuthorComponent } from 'src/app/library/author/author.component';
import { EditBookComponent } from 'src/app/library/edit-book/edit-book.component';
import { EditAuthorComponent } from 'src/app/library/edit-author/edit-author.component';

import { AuthGuard } from 'src/app/core';

import { UserRole } from 'src/app/shared/models';

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
            {
                path: 'edit-book',
                canActivate: [AuthGuard],
                data: { roles: [UserRole.Admin] },
                component: EditBookComponent,
            },
            {
                path: 'author',
                component: AuthorComponent,
            },
            {
                path: 'edit-author',
                canActivate: [AuthGuard],
                data: { roles: [UserRole.Admin] },
                component: EditAuthorComponent,
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LibraryRoutingModule { }
