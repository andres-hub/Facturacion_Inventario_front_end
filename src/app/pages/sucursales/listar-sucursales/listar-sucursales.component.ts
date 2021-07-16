import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../components/services/loading.service';
import { Sucursal } from '../../models/sucursal.model';
import { SucursalesService } from '../../services/sucursales.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listar-sucursales',
  templateUrl: './listar-sucursales.component.html',
  styleUrls: ['./listar-sucursales.component.css']
})

export class ListarSucursalesComponent implements OnInit {

  public desde: number = 0;
  public totalRegistros: Number = 0;
  public mostrandoDesde: Number = 0;
  public mostrandoHasta: Number = 0;
  public sucursales: Sucursal[];

  constructor(
    private location: Location,
    private loadingService: LoadingService,
    private sucursalesService: SucursalesService
  ) { }

  ngOnInit(): void {
    this.cargarSucursales();
  }

  cargarSucursales(){

    this.loadingService.mostrarLoading();

    this.sucursalesService.cargarSucursales(this.desde)
    .subscribe(({total,sucursales})=>{

      this.totalRegistros = total;
      this.sucursales = sucursales;
      this.mostrandoDesde = 1;
      this.mostrandoHasta = sucursales.length;
      this.loadingService.ocultarLoading();

    },(err)=>{

      this.loadingService.ocultarLoading();

      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return this.location.back();
    });

  }

  cambiarEstadoSucursal(sucursal:Sucursal){

    let estado = (sucursal.Estado)? "inactivar": "activar";

    Swal.fire({
      title: '¿Cambiar estado?',
      text: `Está apunto de ${estado} a la sucursal ${sucursal.Nombre}.`,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) =>{

      if(result.isConfirmed){
        
        this.loadingService.mostrarLoading();

        this.sucursalesService.cambiarEstadoSucusal(sucursal._id)
        .subscribe((resp:any)=>{

          this.loadingService.ocultarLoading();
          this.cargarSucursales();
          estado = (resp.sucursal.Estado)? "Activado": "Inactivado";
          Swal.fire('Activado', `${sucursal.Nombre} ${estado} con éxito`, 'success');
        },
        (err)=>{
          Swal.fire({
            title: '¡Error!',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          this.loadingService.ocultarLoading();
        }
        );

      }

    });

  }

}
