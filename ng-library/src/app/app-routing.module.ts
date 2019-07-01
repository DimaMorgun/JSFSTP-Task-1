import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutDefaultComponent } from './shared/layout-default/layout-default.component';

const routes: Routes = [
  {
    path: 'library',
    component: LayoutDefaultComponent,
    loadChildren: () => import('./library/library.module').then(mod => mod.LibraryModule)
  },
  {
    path: '',
    redirectTo: 'library',
    pathMatch: 'full'
  },
  {
    path: '#',
    redirectTo: 'library'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
