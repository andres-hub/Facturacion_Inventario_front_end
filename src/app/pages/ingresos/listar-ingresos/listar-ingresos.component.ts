import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../components/services/loading.service';
import { IngresosService } from '../../services/ingresos.service';

import { Ingreso } from '../../models/ingreso.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-ingresos',
  templateUrl: './listar-ingresos.component.html',
  styles: [
  ]
})
export class ListarIngresosComponent implements OnInit {

  public ingresos: Ingreso[];

  constructor(
    public loadingService: LoadingService,
    private ingresosService: IngresosService
  ) { }

  ngOnInit(): void {

    this.cargarIngresos();

  }

  cargarIngresos(){

    this.loadingService.mostrarLoading();

    this.ingresosService.cargarIngresos()
    .subscribe((ingresos: Ingreso[])=>{      
      this.loadingService.ocultarLoading();
      this.ingresos = ingresos;
    },(err)=>{
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      this.loadingService.ocultarLoading();
     
    })

  }

  inactivarIngreso(ingreso: Ingreso){

    Swal.fire({
      title: `¿Desea inactivar este ingreso, ${ingreso.nombre}? `,
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.loadingService.mostrarLoading();

        this.ingresosService.inactivarIngreso(ingreso._id)
        .subscribe((resp: any)=>{
          console.log(resp);
          this.loadingService.ocultarLoading();
  
          Swal.fire(
            '¡Eliminada!',
            `El ingreso ${resp.nombre} ha sido eliminado.`,
            'success'
          )

          this.cargarIngresos();
  
        },
        (err)=>{
          console.log(err);
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
    })

  }

}
