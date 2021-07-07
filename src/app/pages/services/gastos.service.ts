import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Gasto } from '../models/gasto.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GastosService {

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

  convertirGastos(ingresos: any[]): Gasto[]{

    return ingresos.map(
      gasto => new Gasto(
        gasto._id,
        gasto.nombre,
        gasto.tipo,
        gasto.numeroCuotas,
        gasto.efectivoAnual,
        gasto.frecuencia,   
        gasto.quincena,
        gasto.valor
        )
      );

  }

  crearGasto(gasto: Gasto){

    const url = `${base_url}/gastos`;

    return this.http.post(url, gasto, this.headers);

  }

  cargarGastos(){

    const url = `${base_url}/gastos`;
    return this.http.get(url, this.headers )
                .pipe(
                  map((resp: any) =>{

                    const gastos = this.convertirGastos(resp.gastos);

                    return gastos

                  })
                );

  }

  cargarGasto(id: string){
    
    const url = `${base_url}/gastos/${id}`;

    return this.http.get(url, this.headers).pipe(
      map((resp: {ok:boolean, gasto:Gasto}) => resp.gasto)
    );

  }

  actulizarGasto(gasto: Gasto){

    const url = `${base_url}/gastos/${gasto._id}`;
    return this.http.put(url, gasto, this.headers);

  }

  inactivarGasto(id: string){

    const url = `${base_url}/gastos/${id}`;
    return this.http.delete(url, this.headers).pipe(
      map((resp: {ok: boolean, gasto: Gasto}) => resp.gasto)
    );

  }

}
