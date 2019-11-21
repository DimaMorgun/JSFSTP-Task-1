import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VncTestRoutingModule } from './vnc-test-routing.module';
import { Task1Component } from './task1/task1.component';


@NgModule({
  declarations: [Task1Component],
  imports: [
    CommonModule,
    VncTestRoutingModule
  ]
})
export class VncTestModule { }
