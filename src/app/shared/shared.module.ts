import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumdsComponent } from './breadcrumds/breadcrumds.component';



@NgModule({
  declarations: [
    BreadcrumdsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  exports:[
    BreadcrumdsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
