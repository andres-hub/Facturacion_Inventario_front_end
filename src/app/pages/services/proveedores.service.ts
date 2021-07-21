import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../models/proveedor.model';
import { CargarProveedores } from '../interfaces/cargar-proveedores-interface';
import { map } from 'rxjs/operators';
import { Persona } from '../models/persona.model';
import { Empresa } from '../models/empresa.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

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

  convertirProveedores(proveedores: any[]): Proveedor[]{

    return proveedores.map(
      proveedor => new Proveedor(
        proveedor._id,
        proveedor.Nombre,
        proveedor.NIT,
        proveedor.Direccion,
        proveedor.Telefono,
        proveedor.Correo,
        proveedor.Persona,
        proveedor.Estado,
        proveedor.Empresa
      )
    );

  }

  cargarProveedores(desde: Number = 0){

    const url = `${base_url}/proveedores/?desde=${desde}`;

    return this.http.get<CargarProveedores>(url, this.headers)
                .pipe(
                  map(resp =>{

                    const proveedores = this.convertirProveedores(resp.proveedores);
                    return{
                      total: resp.total,
                      proveedores
                    }

                  })
                );


  }

  cargarProveedor(id: string){

    const url = `${base_url}/proveedores/${id}`;

    return this.http.get(url, this.headers).pipe(
      map((resp: {ok:boolean, proveedor:Proveedor})=> resp.proveedor)
    )

  }

  crearProveedor(proveedor: Proveedor){

    const url = `${base_url}/proveedores`;
    return this.http.post(url, proveedor, this.headers);

  }

  actualizarProveedor(proveedor: Proveedor){

    const url = `${base_url}/proveedores/${proveedor._id}`;
    return this.http.put(url, proveedor, this.headers);

  }

}
