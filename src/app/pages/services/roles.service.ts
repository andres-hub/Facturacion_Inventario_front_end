import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


import { environment } from 'src/environments/environment';

import { CargarRoles } from '../interfaces/cargar-roles-interfase';
import { Rol } from '../models/rol.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RolesService {

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

  private convertirRoles(resp: any[]): Rol[]{

    return resp.map(
      rol => new Rol(
         rol._id,
         rol.nombre
        )
      );
  }

  cargarRolesAll(desde:Number = 0){
    const url = `${base_url}/roles/all`;
    return this.http.get<CargarRoles>(url, this.headers )
                .pipe(
                  map(resp =>{

                    const roles = this.convertirRoles(resp.roles);

                    return {
                      roles
                    };
                  })
                );
  }

  cargarRoles(desde:Number = 0){
    const url = `${base_url}/roles/?desde=${ desde }`;
    return this.http.get<CargarRoles>(url, this.headers )
                .pipe(
                  map(resp =>{

                    const roles = this.convertirRoles(resp.roles);

                    return {
                      total: resp.total,
                      roles
                    };
                  })
                );
  }

  buscarId(id: string){

    const url = `${base_url}/roles/${id}`;

    return this.http.get(url, this.headers).pipe(
      map((resp: {ok:boolean, rol:Rol}) => resp.rol)
    );

  }


  actualizar(rol: Rol){

    const url = `${base_url}/roles/${rol._id}`;
    return this.http.put(url, rol, this.headers);

  }

  crearRol(rol: Rol){

    const url = `${base_url}/roles`;

    return this.http.post(url, rol,this.headers);

  }

}
