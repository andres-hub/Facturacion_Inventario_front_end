import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { Movimiento } from '../models/movimientos.model';
import { CargarQuincenas } from '../interfaces/cargar-quincenas';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

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

  convertirMovimientos(movimientos: any[]): Movimiento[]{

    return movimientos.map(
      movimiento => new Movimiento(
         movimiento._id,
         movimiento.nombre,
         movimiento.pago,
         movimiento.tipo,
         movimiento._id,
         movimiento.valor,
         movimiento.fecha
        )
      );

  }

  pagarMovimiento(movimiento: Movimiento){

    const url = `${base_url}/movimientos/${movimiento._id}`;

    return this.http.put(url, movimiento,this.headers).pipe(
      map((resp:{ok:boolean, movimiento})=>{resp.movimiento})
    );
    
  }

  eliminarMovimiento(id: string){
    
    const url = `${base_url}/movimientos/${id}`;

    return this.http.delete(url, this.headers).pipe(
      map((resp:{ok:boolean, movimiento})=>{resp.movimiento})
    );

  }

  cargarMovimientos(quincena: string, tipo: 'gastos' | 'ingresos'){

    const url = `${base_url}/movimientos/${tipo}/${quincena}`;

    return this.http.get(url, this.headers).pipe(

      map((resp: any)=>{
        const gastos = this.convertirMovimientos(resp.movimientos);        
        return gastos;
      })

    );

  }

  cargarQuincenas(){

    const url = `${base_url}/movimientos/quincenas`;

    return this.http.get<CargarQuincenas>(url, this.headers).pipe(

      map((resp: any)=>{

        return resp._quincenas; 

      })

    )

  }

  cargarMovimientosxQuincena(mes: string, quincena: string){

    const url = `${base_url}/movimientos/getMovimientosXQuincena/${mes}/${quincena}`;

    return this.http.get(url, this.headers).pipe(

      map((resp: any)=>{
        const movimientos = this.convertirMovimientos(resp.movimientos);
        return movimientos;
      })

    );

  }

}
