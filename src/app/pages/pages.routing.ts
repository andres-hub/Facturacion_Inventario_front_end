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
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { SucursalComponent } from './sucursales/sucursal/sucursal.component';
import { ListarSucursalesComponent } from './sucursales/listar-sucursales/listar-sucursales.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ListarProveedoresComponent } from './proveedores/listar-proveedores/listar-proveedores.component';
import { ProveedorComponent } from './proveedores/proveedor/proveedor.component';
import { ProductosComponent } from './productos/productos.component';
import { ListarProductosComponent } from './productos/listar-productos/listar-productos.component';
import { ProductoComponent } from './productos/producto/producto.component';

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
        path: 'empresas',
        component: EmpresasComponent,
        canActivate: [AuthGuard],
        data:{titulo: 'Empresa'}
      },
      {
        path:'sucursales',
        component: SucursalesComponent,
        canActivate: [AuthGuard],
        data:{titulo: 'Sucursales'},
        children:[
          {path:'', component: ListarSucursalesComponent, canActivate:[AuthGuard, RutasGuard], data:{titulo: 'Sucursales'}},
          {path:'sucursal/:id', component: SucursalComponent, canActivate:[AuthGuard,RutasGuard], data:{titulo: 'Sucursal', rutas:[{alias:'Sucursales', url:'sucursales'}]}}
        ]
      },
      {
        path:'proveedores',
        component: ProveedoresComponent,
        canActivate: [AuthGuard],
        data:{titulo: 'Proveedores'},
        children:[
          {path:'', component: ListarProveedoresComponent, canActivate:[AuthGuard, RutasGuard], data:{titulo: 'Proveedores'}},
          {path:'proveedor/:id', component: ProveedorComponent, canActivate:[AuthGuard,RutasGuard], data:{titulo: 'Proveedores', rutas:[{alias:'Proveedores', url:'proveedores'}]}}
        ]
      },
      {
        path:'productos',
        component: ProductosComponent,
        canActivate: [AuthGuard],
        data:{titulo: 'Productos'},
        children:[
          {path:'', component: ListarProductosComponent, canActivate:[AuthGuard, RutasGuard], data:{titulo: 'Productos'}},
          {path:'producto/:id', component: ProductoComponent, canActivate:[AuthGuard,RutasGuard], data:{titulo: 'Productos', rutas:[{alias:'Productos', url:'productos'}]}}
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