import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: BookComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BookRoutingModule { }
