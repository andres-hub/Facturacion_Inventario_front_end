import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const nombreApi = environment.nombreApi;

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { environment } from '../environments/environment';

const routes: Routes=[
  {path:'', redirectTo:`/${nombreApi}`, pathMatch:'full'},
  {path:'**', component:NopagefoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
