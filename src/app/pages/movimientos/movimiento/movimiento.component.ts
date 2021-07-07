import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


import { LoadingService } from '../../../components/services/loading.service';
import { Movimiento } from '../../models/movimientos.model';
import { MovimientosService } from '../../services/movimientos.service';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styles: [
  ]
})
export class MovimientoComponent implements OnInit {

  public movimientos: Movimiento[] = [];

  constructor(
    public loadingService:LoadingService,
    private activatedRoute: ActivatedRoute,
    private movimientosService:MovimientosService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({mes,quincena}) => this.cargarMovimientos(mes, quincena));
  }

  cargarMovimientos(mes: string,quincena: string){

    this.movimientosService.cargarMovimientosxQuincena(mes,quincena).subscribe(movimientos =>{
      this.movimientos = movimientos;
      console.log(this.movimientos);
      this.loadingService.ocultarLoading();
    },(err)=>{
      this.loadingService.ocultarLoading();
      console.log(err);
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
    );

  }

}
