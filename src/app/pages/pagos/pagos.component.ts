import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { LoadingService } from '../../components/services/loading.service';

import { Movimiento } from '../models/movimientos.model';
import Swal from 'sweetalert2';

import { MovimientosService } from '../services/movimientos.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styles: [
  ]
})
export class PagosComponent implements OnInit {

  private quincena: string;
  public totalIngresos: number = 0;
  public totalPagos: number = 0;
  public totalGastos: Number = 0;
  public saldo: number = 0;
  public ingresos: Movimiento[] = [];
  public gastos: Movimiento[] = [];
  public movimientos: Movimiento[];

  constructor(
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    public loadingService: LoadingService,
    private movimientosService: MovimientosService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      
      if (id != this.quincena) {
        this.quincena = id;    
        this.cargarIngresos();
        this.cargarGastos();
      }
    });

  }

  cargarIngresos(){
    
    this.totalIngresos = 0;
    this.totalPagos = 0;
    this.saldo = 0;
    this.totalGastos = 0;

    this.loadingService.mostrarLoading();

    this.movimientosService.cargarMovimientos(this.quincena, 'ingresos')
    .subscribe((ingresos: Movimiento[])=>{
      this.ingresos = ingresos;
      this.sumIngresos();
      this.loadingService.ocultarLoading();
    },
    (err)=>{
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });  
      this.loadingService.ocultarLoading();    
    });

  }

  cargarGastos(){
    
    this.loadingService.mostrarLoading();

    this.movimientosService.cargarMovimientos(this.quincena,'gastos')
    .subscribe((gastos: Movimiento[])=>{
      this.gastos = gastos
      this.sumGastos();
      this.loadingService.ocultarLoading();
    },
    (err)=>{
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });      
    });

  }

  cambioIngreso(ingreso: Movimiento , event){

    if(event.target.checked){

      ingreso.pago = true;

      this.movimientosService.pagarMovimiento(ingreso)
      .subscribe((res: any)=>{
        this.totalIngresos = Number(this.totalIngresos) + Number( ingreso.valor);
        this.saldo = Number(this.totalIngresos) - Number(this.totalPagos); 
        this.toastr.success(ingreso.nombre, '¡ Ingreso agregado !', {
          timeOut: 1000,
        });
      },
      (err)=>{
        Swal.fire({
          title: '¡Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok'
        }); 
        ingreso.pago = false;       
      });

    }else{
     
      this.movimientosService.eliminarMovimiento(ingreso._id)
      .subscribe((resp)=>{
        ingreso.pago = false;
        this.totalIngresos = Number(this.totalIngresos) - Number(ingreso.valor);
        this.saldo = Number(this.totalIngresos) - Number(this.totalPagos); 
        this.toastr.warning( ingreso.nombre, '¡ Ingreso removido !', {
          timeOut: 1000,
        });
      },
      (err)=>{
        Swal.fire({
          title: '¡Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok'
        });        
      });
 
    }
     
  }

  cambioGastos(gasto: Movimiento, event){

    if(event.target.checked){
         
      gasto.pago = true;

      this.movimientosService.pagarMovimiento(gasto)
      .subscribe((res: any)=>{

        this.totalPagos = Number(this.totalPagos) + Number(gasto.valor); 
        this.saldo = Number(this.totalIngresos) - Number(this.totalPagos); 
        this.toastr.success(gasto.nombre, '¡ Pagado !', {
          timeOut: 1000,
        });

      },
      (err)=>{
        Swal.fire({
          title: '¡Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok'
        }); 
        console.log(err);   
        gasto.pago = false;       
      });
    
    }else{

      this.movimientosService.eliminarMovimiento(gasto._id)
      .subscribe((resp)=>{
        gasto.pago = false;        
        this.totalPagos = Number(this.totalPagos) - Number(gasto.valor);
        this.saldo = Number(this.totalIngresos) - Number(this.totalPagos);
        this.toastr.warning(gasto.nombre, '¡ Pago cancelado !', {
          timeOut: 1000,
        });
      },
      (err)=>{
        Swal.fire({
          title: '¡Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok'
        });  
        console.log(err);      
      });

    }

  }

  sumIngresos(){

    this.ingresos.map(ingreso =>{
      if(ingreso.pago){
        this.totalIngresos = Number(this.totalIngresos) + Number( ingreso.valor);
      }
    });

    this.saldo = Number(this.totalIngresos) - Number(this.totalPagos);

  }  
  
  sumGastos(){
    
    this.gastos.map(gasto =>{
      if(gasto.pago){
        this.totalPagos = Number(this.totalPagos) + Number(gasto.valor);

      }
      this.totalGastos =  Number(this.totalGastos) + Number(gasto.valor);
    });

    this.saldo = Number(this.totalIngresos) - Number(this.totalPagos);

  } 

}
