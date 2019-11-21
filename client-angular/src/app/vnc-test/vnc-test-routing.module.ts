import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Task1Component } from './task1/task1.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'task-1',
        pathMatch: 'full',
    },
    {
        path: 'task-1',
        component: Task1Component,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VncTestRoutingModule { }
