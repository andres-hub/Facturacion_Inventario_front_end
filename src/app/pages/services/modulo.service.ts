import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Modulo } from '../models/modulo.model';
import { CargarModulos } from '../interfaces/cargar-modulos-interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

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

  private convertirModulos(resp: any[]): Modulo[]{

    return resp.map(
      modulo => new Modulo(
         modulo._id,
         modulo.nombre,
         modulo.icono
        )
      );
  }

  allModulos(){

    const url = `${base_url}/modulos/all`;

    return this.http.get(url,this.headers).pipe(
      map((resp: any) =>{
        const modulos = this.convertirModulos(resp.modulos);
        return modulos
      })
    );

  }

  cargarModulos(desde:Number = 0){
    const url = `${base_url}/modulos/?desde=${ desde }`;
    return this.http.get<CargarModulos>(url, this.headers )
                .pipe(
                  map(resp =>{

                    const modulos = this.convertirModulos(resp.modulos);

                    return {
                      total: resp.total,
                      modulos
                    };
                  })
                );
  }

  buscar(termino: string){

    const url = `${base_url}/modulos/buscar/${termino}`;

    return this.http.get<CargarModulos>(url, this.headers)
                .pipe(
                  map((resp: any) =>{

                    const modulos = this.convertirModulos(resp.modulos);

                    return {
                      total: resp.total,
                      modulos
                    };

                  })
                )

  }

  buscarId(id: string){

    const url = `${base_url}/modulos/${id}`;

    return this.http.get(url, this.headers).pipe(
      map((resp: {ok:boolean, modulo:Modulo}) => resp.modulo)
    );

  }

  actualizar(modulo: Modulo){

    const url = `${base_url}/modulos/${modulo._id}`;
    return this.http.put(url, modulo, this.headers);

  }

  crearModulo(modulo: Modulo){

    const url = `${base_url}/modulos`;

    return this.http.post(url, modulo, this.headers);

  }

}
