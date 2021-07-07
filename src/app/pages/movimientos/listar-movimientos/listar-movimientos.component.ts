import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { LoadingService } from '../../../components/services/loading.service';
import { MovimientosService } from '../../services/movimientos.service';
import { CargarQuincenas } from '../../interfaces/cargar-quincenas';

@Component({
  selector: 'app-listar-movimientos',
  templateUrl: './listar-movimientos.component.html',
  styles: [
  ]
})
export class ListarMovimientosComponent implements OnInit {

  public quincenas: CargarQuincenas[] = [];

  constructor(
    public loadingService: LoadingService,
    private movimientosService: MovimientosService
  ) { }

  ngOnInit(): void {
    this.cargarMovimientos();
  }

  cargarMovimientos(){
    
    this.movimientosService.cargarQuincenas().subscribe(quincenas =>{
      this.quincenas = quincenas;
      this.loadingService.ocultarLoading();
    },(err)=>{
      this.loadingService.ocultarLoading();
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    });

  }

}
