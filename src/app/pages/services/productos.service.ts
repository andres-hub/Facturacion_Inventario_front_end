import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { Producto } from '../models/producto.model';
import { CargarProductos } from '../interfaces/cargar-productos-interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

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

  convertirProductos(productos: any[]): Producto[]{

    return productos.map(
      producto => new Producto(
        producto._id,
        producto.Estado,
        producto.Proveedores,
        producto.Nombre,
        producto.Codigo,
        producto.UnidadMedida,
        producto.ValorInterno,
        producto.ValorPublico,
        producto.Empresa,
        producto.ValorMayorista,
        producto.StockMinimo
      )
    );

  }

  cargarProductos(desde: Number = 0){

    const url = `${base_url}/productos/?desde=${desde}`;

    return this.http.get<CargarProductos>(url, this.headers)
                .pipe(
                  map(resp =>{
                    const productos = this.convertirProductos(resp.productos);
                    return {
                      total: resp.total,
                      productos
                    }
                  })
                );

  }

  cargarProducto(id: string){

    const url = `${base_url}/productos/${id}`;

    return this.http.get(url, this.headers).pipe(
      map((resp: {ok:boolean, producto:Producto,})=> resp.producto)
    )

  }

  crearProducto(producto: Producto){

    const url = `${base_url}/productos`;
    return this.http.post(url,producto, this.headers);

  }

  actualizarProducto(producto: Producto){

    const url = `${base_url}/productos/${producto._id}`;
    return this.http.put(url, producto, this.headers);

  }

  cambiarEstadoProducto(id: string){

    const url = `${base_url}/productos/${id}`;
    return this.http.delete(url, this.headers);

  }



}
