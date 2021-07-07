import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RemenberPassComponent } from './remenber-pass/remenber-pass.component';
import { CambioPassComponent } from './cambio-pass/cambio-pass.component';
import { CambioPassGuard } from '../guards/cambio-pass.guard';

const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'remenber-pass', component: RemenberPassComponent},
    {path:'cambio-pass/:token', component: CambioPassComponent,canActivate:[CambioPassGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule {}