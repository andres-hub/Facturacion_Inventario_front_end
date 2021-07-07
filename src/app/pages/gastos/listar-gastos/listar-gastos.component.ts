import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../components/services/loading.service';
import { Gasto } from '../../models/gasto.model';
import { GastosService } from '../../services/gastos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-gastos',
  templateUrl: './listar-gastos.component.html',
  styles: [
  ]
})
export class ListarGastosComponent implements OnInit {

  public gastos: Gasto[] = [];

  constructor(
    public loadingService: LoadingService,
    private gastosService:GastosService
  ) { }

  ngOnInit(): void {
    this.cargarGastos();    
  }

  cargarGastos(){

    this.loadingService.mostrarLoading();

    this.loadingService.mostrarLoading();

    this.gastosService.cargarGastos()
    .subscribe((gastos: Gasto[])=>{      
      this.loadingService.ocultarLoading();
      this.gastos = gastos;
    },(err)=>{
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      this.loadingService.ocultarLoading();
     
    })

    this.loadingService.ocultarLoading();

  }

  inactivarGasto(gasto: Gasto){

    Swal.fire({
      title: `¿Desea inactivar este gasto, ${gasto.nombre}? `,
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

        this.gastosService.inactivarGasto(gasto._id)
        .subscribe((resp: any)=>{
          
          this.loadingService.ocultarLoading();
  
          Swal.fire(
            '¡Eliminada!',
            `El gasto ${resp.nombre} ha sido eliminado.`,
            'success'
          )

          this.cargarGastos();
  
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
