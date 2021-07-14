import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarEmpresa } from '../interfaces/cargar-empresa';
import { Empresa } from '../models/empresa.model';

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

  cargarEmpresa(){

    const url = `${base_url}/empresas`;

    return this.http.get<CargarEmpresa>(url, this.headers).pipe(
      map(resp => {
        return{
          empresa: resp.empresa
        }

      })
    )
  }

  crearEmpresa(empresa: Empresa){

    const url = `${base_url}/empresas`;
    return this.http.post(url, empresa,this.headers);

  }

}
