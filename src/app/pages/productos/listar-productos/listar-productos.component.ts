import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { LoadingService } from '../../../components/services/loading.service';
import { ProductosService } from '../../services/productos.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  public desde: Number = 0;
  public totalRegistros: Number = 0;
  public productos: Producto[];
  public mostrandoDesde: Number = 0;
  public mostrandoHasta: Number = 0;

  constructor(
    private location: Location,
    private loadingService: LoadingService,
    private productosService: ProductosService
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(){

    this.productosService.cargarProductos(this.desde)
    .subscribe(({total, productos})=>{

      this.totalRegistros = total;
      this.productos = productos;
      this.mostrandoDesde = 1;
      this.mostrandoHasta = productos.length;
      this.loadingService.ocultarLoading();

    },(err)=>{
      console.log(err);
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return this.location.back();
    });

  }

  cambiarEstadoProducto(producto:Producto){

    let estado = (producto.Estado)? "inactivar": "activar";

    Swal.fire({
      title: '¿Cambiar estado?',
      text:`Está apunto de ${estado} a ${producto.Nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      
      if (result.isConfirmed) {

        this.loadingService.mostrarLoading();

        this.productosService.cambiarEstadoProducto(producto._id)
            .subscribe((resp:any) =>{
              this.loadingService.ocultarLoading();
              this.cargarProductos();
              estado = (resp.usuario.estado)? "Activado": "Inactivado";
              Swal.fire('Activado', `${producto.Nombre} ${estado} con éxito`, 'success');
            }
            ,(err)=>{
              Swal.fire({
                title: '¡Error!',
                text: err.error.msg,
                icon: 'error',
                confirmButtonText: 'Ok'
              });
              this.loadingService.ocultarLoading(); 
            });
      } 
    })

  }

}
