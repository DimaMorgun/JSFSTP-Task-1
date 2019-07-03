import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'book',
        component: BookComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LibraryRoutingModule { }
