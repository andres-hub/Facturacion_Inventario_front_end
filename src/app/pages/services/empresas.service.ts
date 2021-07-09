import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarEmpresas } from '../interfaces/cargar-empresas-interface';
import { Empresa } from '../models/empresas.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

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

  private convertir(resp: any[]): Empresa[]{

    return resp.map(
      empresa => new Empresa(
         empresa._id,
         empresa.modulo,
         empresa.nombre,
         empresa.url,
         empresa.acciones   
      )      
      );
  }

  cargarEmpresas(){

    const url = `${base_url}/empresas`;

    return this.http.get<CargarEmpresas>(url, this.headers).pipe(
      map(resp => {
        const empresas = this.convertir(resp.empresas);
        return{
          empresas
        }

      })
    )
  }

}
