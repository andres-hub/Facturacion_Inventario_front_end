import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Sucursal } from '../models/sucursal.model';
import { CargarRoles } from '../interfaces/cargar-roles-interfase';
import { CargarSucursales } from '../interfaces/cargar-sucursales-interfase';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers:{
        'x-token': this.token
      }
    }
  }

  convertirSucursales(sucursales: any[]): Sucursal[]{

    return sucursales.map(
      sucursal => new Sucursal(
        sucursal._id,
        sucursal.Empresa,
        sucursal.Nombre,
        sucursal.Direccion,
        sucursal.Telefono,
        sucursal.Estado
      )
    );

  };

  cargarSucursales(desde:Number = 0){

    const url = `${base_url}/sucursales/?desde=${desde}`;

    return this.http.get<CargarSucursales>(url,this.headers)
                .pipe(
                  map(resp =>{

                    const sucursales = this.convertirSucursales(resp.sucursales);

                    return{
                      total: resp.total,
                      sucursales
                    }

                  })
                );

  }

  cargarSucursalId(id: string){

    const url = `${base_url}/sucursales/${id}`;

    return this.http.get(url, this.headers).pipe(
      map((resp: {ok:boolean,sucursal:Sucursal})=> resp.sucursal)
    );

  }

  crearSucursal(sucursal:Sucursal){

    const url = `${base_url}/sucursales`;

    return this.http.post(url,sucursal,this.headers);

  }

  actualizarSucursal(sucursal:Sucursal){

    const url = `${base_url}/sucursales/${sucursal._id}`;
    return this.http.put(url, sucursal, this.headers);

  }

  cambiarEstadoSucusal(id:string){

    const url = `${base_url}/sucursales/${id}`;
    return this.http.delete(url, this.headers);

  }

}
