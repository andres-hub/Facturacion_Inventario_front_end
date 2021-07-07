import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { LoadingAllComponent } from './loading-all/loading-all.component';

@NgModule({
  declarations: [
    LoadingComponent,
    LoadingAllComponent
  ],
  exports: [
    LoadingComponent,
    LoadingAllComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ComponentsModule { }
