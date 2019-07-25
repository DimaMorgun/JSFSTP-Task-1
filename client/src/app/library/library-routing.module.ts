import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { LibraryComponent } from './library.component';

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
                component: HomeComponent
            },
            {
                path: 'book',
                component: BookComponent
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LibraryRoutingModule { }
