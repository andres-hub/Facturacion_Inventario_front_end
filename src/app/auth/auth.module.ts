import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RemenberPassComponent } from './remenber-pass/remenber-pass.component';
import { CambioPassComponent } from './cambio-pass/cambio-pass.component';



@NgModule({
  declarations: [    
    LoginComponent,
    RegisterComponent,
    RemenberPassComponent,
    CambioPassComponent
  ],
  exports:[    
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
