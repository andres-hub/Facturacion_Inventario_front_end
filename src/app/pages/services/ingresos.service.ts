import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Ingreso } from '../models/ingreso.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

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

  convertirIngresos(ingresos: any[]): Ingreso[]{

    return ingresos.map(
      ingreso => new Ingreso(
         ingreso._id,
         ingreso.nombre,
         ingreso.frecuencia,
         ingreso.valor
        )
      );

  }

  crearIngreso(ingreso: Ingreso){

    const url = `${base_url}/ingresos`;

    return this.http.post(url, ingreso,this.headers);

  }

  cargarIngresos(){

    const url = `${base_url}/ingresos`;
    return this.http.get(url, this.headers )
                .pipe(
                  map((resp: any) =>{

                    const ingresos = this.convertirIngresos(resp.ingresos);

                    return ingresos

                  })
                );

  }

  cargarIngreso(id: string){
    
    const url = `${base_url}/ingresos/${id}`;

    return this.http.get(url, this.headers).pipe(
      map((resp: {ok:boolean, ingreso:Ingreso}) => resp.ingreso)
    );

  }

  actulizarIngreso(ingreso: Ingreso){

    const url = `${base_url}/ingresos/${ingreso._id}`;
    return this.http.put(url, ingreso, this.headers);

  }

  inactivarIngreso(id: string){

    const url = `${base_url}/ingresos/${id}`;
    return this.http.delete(url, this.headers).pipe(
      map((resp: {ok: boolean, ingreso: Ingreso}) => resp.ingreso)
    );

  }

}
