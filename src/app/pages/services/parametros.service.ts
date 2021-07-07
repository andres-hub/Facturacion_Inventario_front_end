import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { CargarParametros } from '../interfaces/cargar-parametros-interfase';
import { Parametro } from '../models/parametros.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){

    return {
      headers:{
        'x-token': this.token
      }
    }

  }

  convertirParametros(resp: any[]): Parametro[]{

    return resp.map(
      parametro => new Parametro(
         parametro._id,
         parametro.nombre,
         parametro.valor,
         parametro.estado
        )
      );
  }

  cargarParametros(desde:Number = 0){
    const url = `${base_url}/parametros/?desde=${ desde }`;
    return this.http.get<CargarParametros>(url, this.headers )
                .pipe(
                  map(resp =>{

                    const parametros = this.convertirParametros(resp.parametros);

                    return {
                      total: resp.total,
                      parametros
                    };
                  })
                );
  }

  buscar(termino: string){

    const url = `${base_url}/parametros/buscar/${termino}`;

    return this.http.get<CargarParametros>(url, this.headers)
                .pipe(
                  map((resp: any) =>{

                    const parametros = this.convertirParametros(resp.parametros);

                    return {
                      total: resp.total,
                      parametros
                    };

                  })
                )

  }

  buscarId(id: string){

    const url = `${ base_url }/parametros/${ id }`;

    return this.http.get(url, this.headers).pipe(
      map((resp:{ ok:boolean, parametro:Parametro }) => resp.parametro)
    );

  }

  actualizar(parametro: Parametro){

    const url = `${base_url}/parametros/${parametro._id}`;
    return this.http.put(url, parametro, this.headers);

  }

  crearParametro(parametro: Parametro){

    const url = `${base_url}/parametros`;

    return this.http.post(url, parametro, this.headers);

  }

}
