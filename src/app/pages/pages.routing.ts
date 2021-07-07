import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';
import { RutasGuard } from '../guards/rutas.guard';

import { environment } from 'src/environments/environment.prod';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ModulosComponent } from './modulos/modulos.component';
import { ModuloComponent } from './modulos/modulo/modulo.component';
import { ListarModulosComponent } from './modulos/listar-modulos/listar-modulos.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { ListarEntidadesComponent } from './entidades/listar-entidades/listar-entidades.component';
import { EntidadComponent } from './entidades/entidad/entidad.component';
import { ListarParametrosComponent } from './parametros/listar-parametros/listar-parametros.component';
import { ParametroComponent } from './parametros/parametro/parametro.component';
import { ParametrosComponent } from './parametros/parametros/parametros.component';
import { RolesComponent } from './roles/roles.component';
import { ListarRolesComponent } from './roles/listar-roles/listar-roles.component';
import { RolComponent } from './roles/rol/rol.component';
import { PermisosComponent } from './permisos/permisos.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { ListarIngresosComponent } from './ingresos/listar-ingresos/listar-ingresos.component';
import { IngresoComponent } from './ingresos/ingreso/ingreso.component';
import { GastosComponent } from './gastos/gastos.component';
import { ListarGastosComponent } from './gastos/listar-gastos/listar-gastos.component';
import { GastoComponent } from './gastos/gasto/gasto.component';
import { PagosComponent } from './pagos/pagos.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { ListarMovimientosComponent } from './movimientos/listar-movimientos/listar-movimientos.component';
import { MovimientoComponent } from './movimientos/movimiento/movimiento.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';

const routes: Routes = [    
  {
    // TODO: Poner esto como variable global 
    path: environment.nombreApi , component: PagesComponent,
    canActivate:[AuthGuard],
    children:[
      {path: '', component:DashboardComponent, canActivate:[AuthGuard], data: {titulo: 'Home'}},
      {
        path: 'modulos', 
        component:ModulosComponent,
        canActivate:[AuthGuard, RutasGuard], 
        data: {titulo: 'Construir menú'},
        children:[
          {path: '', component:ListarModulosComponent, canActivate:[AuthGuard, RutasGuard], data: {titulo: 'Construir Menú'}},
          {
            path: 'modulo/:id', component:ModuloComponent, 
            canActivate:[AuthGuard, RutasGuard], 
            data: {
              rutas:[{alias:'Construir Menú', url:'modulos'}], 
              titulo: 'Modulo'
            }
          },
          {
            path: 'entidades/:id', 
            component:EntidadesComponent,
            canActivate:[AuthGuard, RutasGuard], 
            data: {titulo: 'modulo'},
            children:[
              {
                path: '', 
                component: ListarEntidadesComponent, 
                canActivate:[AuthGuard, RutasGuard], 
                data: {
                  titulo: 'Listar Entidades',
                  rutas:[{alias:'Construir Menú', url:'modulos'}]
                }
              },
              {
                path: 'entidad/:id', 
                component: EntidadComponent, 
                canActivate:[AuthGuard, RutasGuard], 
                data: {
                  titulo: 'Entidad',
                  rutas:[{alias:'Construir Menú', url:'modulos'},{alias:'Listar Entidades', url:'modulos/entidades/:id'}]
                }
              }
            ]
          }
        ]
      },
      {
        path: 'parametros',
        component: ParametrosComponent, 
        canActivate:[AuthGuard, RutasGuard],
        data:{titulo: 'Parametros'},
        children:[
          {path: '', component: ListarParametrosComponent, canActivate:[AuthGuard, RutasGuard], data: {tilulo: 'Listar Parametros'}},
          {path: 'parametro/:id', component: ParametroComponent, canActivate:[AuthGuard, RutasGuard], data: {rutas:[{alias:'Listar Parametros', url:'parametros'}],titulo: 'Parametro'}}
        ]
      },

      {
        path: 'roles', 
        component: RolesComponent,
        canActivate:[AuthGuard, RutasGuard],
        data: {titulo: 'Roles'},
        children:[
          {path: '', component: ListarRolesComponent, canActivate:[AuthGuard, RutasGuard], data: {titulo: 'Listar Roles'}},
          {path: 'rol/:id', component: RolComponent, canActivate:[AuthGuard, RutasGuard], data: {rutas:[{alias:'Listar Roles', url:'roles'}], titulo: 'Rol'}}
        ]
      },
      {path: 'permisos/:tipo/:id', component: PermisosComponent, canActivate:[AuthGuard, RutasGuard], data: {titulo: 'Permisos'}},
      //{path: 'users', component: UsersComponent, canActivate:[AuthGuard, RutasGuard], data: {titulo: 'Listar Usuarios'}},
      {
        path: 'usuarios', 
        component: UsuariosComponent, canActivate:[AuthGuard, RutasGuard],
        data: {titulo: 'Listar Usuarios'},
        children:[
          {path: '', component: ListarUsuariosComponent, canActivate:[AuthGuard, RutasGuard], data: {titulo: 'Listar Usuarios'}},
          {path: 'usuario/:id', component: UsuarioComponent, canActivate:[AuthGuard, RutasGuard], data: {rutas:[{alias:'Listar Usuarios', url:'usuario'}], titulo: 'Usuario'}}
        ]
      },
      {path: 'settings', component: AccountSettingsComponent, canActivate:[AuthGuard], data: {titulo: 'Configuraciones'}},
      {path: 'perfil', component: PerfilComponent, canActivate:[AuthGuard], data: {titulo: 'Mi perfil'}},

      //negocio
      {
        path:'ingresos', 
        component: IngresosComponent, 
        canActivate:[AuthGuard], 
        data: {titulo: 'Ingresos'},
        children:[
          {path: '', component: ListarIngresosComponent, canActivate:[AuthGuard, RutasGuard], data:{titulo: 'Ingresos'}},
          {path: 'ingreso/:id', component: IngresoComponent, canActivate:[AuthGuard, RutasGuard], data: { titulo: 'Ingreso', rutas:[{alias: 'Ingresos', url:'ingresos'}] }}
        ]
      },
      {
        path:'gastos', 
        component: GastosComponent, 
        canActivate:[AuthGuard], 
        data: {titulo: 'Gastos'},
        children:[
          {path: '', component: ListarGastosComponent, canActivate:[AuthGuard, RutasGuard], data:{titulo: 'Gastos'}},
          {path: 'gasto/:id', component: GastoComponent, canActivate:[AuthGuard, RutasGuard], data: { titulo: 'Gasto', rutas:[{alias: 'Gastos', url:'gastos'}] }}
        ]
      },
      {
        path:'pagos/:id', 
        component: PagosComponent, 
        canActivate:[AuthGuard], 
        data: {titulo: 'Pagos'},        
      },
      {
        path:'movimientos', 
        component: MovimientosComponent, 
        canActivate:[AuthGuard], 
        data: {titulo: 'Quincenas'},
        children:[
          {path: '', component: ListarMovimientosComponent, canActivate:[AuthGuard, RutasGuard], data:{titulo: 'Quincenas'}},
          {path: 'movimiento/:mes/:quincena', component: MovimientoComponent, canActivate:[AuthGuard, RutasGuard], data: { titulo: 'Movimientos', rutas:[{alias: 'Quincenas', url:'movimientos'}] }}
        ]
      },
    ]
  },
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class PagesRoutingModule {}