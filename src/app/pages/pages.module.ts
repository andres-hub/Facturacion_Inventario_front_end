import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//Modulos
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdministrationComponent } from './administration/administration.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';

import { ModulosComponent } from './modulos/modulos.component';
import { ModuloComponent } from './modulos/modulo/modulo.component';
import { ListarModulosComponent } from './modulos/listar-modulos/listar-modulos.component';

import { EntidadesComponent } from './entidades/entidades.component';
import { EntidadComponent } from './entidades/entidad/entidad.component';
import { ListarEntidadesComponent } from './entidades/listar-entidades/listar-entidades.component';
import { ParametrosComponent } from './parametros/parametros/parametros.component';
import { ListarParametrosComponent } from './parametros/listar-parametros/listar-parametros.component';
import { ParametroComponent } from './parametros/parametro/parametro.component';
import { RolesComponent } from './roles/roles.component';
import { ListarRolesComponent } from './roles/listar-roles/listar-roles.component';
import { RolComponent } from './roles/rol/rol.component';
import { PermisosComponent } from './permisos/permisos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { ListarSucursalesComponent } from './sucursales/listar-sucursales/listar-sucursales.component';
import { SucursalComponent } from './sucursales/sucursal/sucursal.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProveedorComponent } from './proveedores/proveedor/proveedor.component';
import { ListarProveedoresComponent } from './proveedores/listar-proveedores/listar-proveedores.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdministrationComponent,
    PagesComponent,
    AccountSettingsComponent,
    PerfilComponent,
    ModulosComponent,
    ListarModulosComponent,
    ModuloComponent,
    EntidadesComponent,
    EntidadComponent,
    ListarEntidadesComponent,
    ParametrosComponent,
    ListarParametrosComponent,
    ParametroComponent,
    RolesComponent,
    ListarRolesComponent,
    RolComponent,
    PermisosComponent,
    UsuariosComponent,
    UsuarioComponent,
    ListarUsuariosComponent,
    EmpresasComponent,
    SucursalesComponent,
    ListarSucursalesComponent,
    SucursalComponent,
    ProveedoresComponent,
    ProveedorComponent,
    ListarProveedoresComponent
  ],
  exports:[
    DashboardComponent,
    AdministrationComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ]
})

export class PagesModule { }
