import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CargarEntidades } from '../interfaces/cargar-entidades-interfase';
import { Entidad } from '../models/entidad.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {

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

  private convertir(resp: any[]): Entidad[]{

    return resp.map(
      entidad => new Entidad(
         entidad._id,
         entidad.moduloId,
         entidad.nombre,
         entidad.url,
         entidad.acciones   
      )      
      );
  }

  cargarEntidades(id: string,desde: number = 0){

    const url = `${base_url}/entidades/${id}?desde`;

    return this.http.get<CargarEntidades>(url, this.headers).pipe(
      map(resp => {
        const entidades = this.convertir(resp.entidades);
        return{
          total: resp.total,
          entidades
        }

      })
    )

  }

  buscar(id:string, termino: string){

    const url = `${base_url}/entidades/${id}/buscar/${termino}`;
    
    return this.http.get<CargarEntidades>(url,this.headers).pipe(
      map(resp => {
        const entidades = this.convertir(resp.entidades);
        return{
          total: resp.total,
          entidades
        }
      })
    )

  }
  
  buscarId(id:string){

    const url = `${base_url}/entidades/buscarId/${id}`;

    console.log(id);

    return this.http.get(url,this.headers).pipe(
      map((resp: {ok:boolean, entidad:Entidad}) => resp.entidad)
    );

  }

  crearEntidad(entidad: Entidad){

    const url = `${base_url}/entidades`;

    return this.http.post(url, entidad, this.headers);

  }

  actualizarEntidad(entidad: Entidad){

    const url = `${base_url}/entidades/entidad/${entidad._id}`;

    return this.http.put(url, entidad,this.headers);

  }

}
