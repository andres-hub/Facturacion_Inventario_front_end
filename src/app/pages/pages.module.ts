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
import { IngresosComponent } from './ingresos/ingresos.component';
import { IngresoComponent } from './ingresos/ingreso/ingreso.component';
import { ListarIngresosComponent } from './ingresos/listar-ingresos/listar-ingresos.component';
import { GastosComponent } from './gastos/gastos.component';
import { ListarGastosComponent } from './gastos/listar-gastos/listar-gastos.component';
import { GastoComponent } from './gastos/gasto/gasto.component';
import { PagosComponent } from './pagos/pagos.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { ListarMovimientosComponent } from './movimientos/listar-movimientos/listar-movimientos.component';
import { MovimientoComponent } from './movimientos/movimiento/movimiento.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { EmpresasComponent } from './empresas/empresas.component';

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
    IngresosComponent,
    IngresoComponent,
    ListarIngresosComponent,
    GastosComponent,
    ListarGastosComponent,
    GastoComponent,
    PagosComponent,
    MovimientosComponent,
    ListarMovimientosComponent,
    MovimientoComponent,
    UsuariosComponent,
    UsuarioComponent,
    ListarUsuariosComponent,
    EmpresasComponent
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
