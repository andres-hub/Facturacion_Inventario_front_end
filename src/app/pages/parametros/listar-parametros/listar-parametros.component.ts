import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { LoadingService } from '../../../components/services/loading.service';

import { Parametro } from '../../models/parametros.model';
import { ParametrosService } from '../../services/parametros.service';
import { CargarParametros } from '../../interfaces/cargar-parametros-interfase';

@Component({
  selector: 'app-listar-parametros',
  templateUrl: './listar-parametros.component.html',
  styles: [
  ]
})
export class ListarParametrosComponent implements OnInit {

  public parametros: Parametro[] = [];
  public parametrosTemp: Parametro[] = [];

  public totalRegistros: number = 0;
  public totalRegistrosTem: number = 0;
  public desde: number = 0;
  public viewDesde: number = 1;
  public hasta: number = 10;
  public Sigiente: boolean = true;
  public Anterior: boolean = false;
  public intervalo:number = 10;

  constructor(
    public loadingService: LoadingService,
    private parametrosService: ParametrosService
  ) { }

  ngOnInit(): void {

    this.cargar();

  }

  
  cambiarPagina(valor: number){

    this.desde += valor;
    this.hasta += valor;
    this.viewDesde += valor;

    if(this.hasta >= this.totalRegistros){
      this.Sigiente = false;
      this.hasta = this.totalRegistros;
    }else{
      this.Sigiente = true;
    }

    if( this.desde === 0 ){
      this.Anterior = false;
    }else{
      this.Anterior = true;
    }

    if(this.viewDesde === this.hasta){
      this.hasta += this.intervalo - this.parametros.length;
    }

    this.cargar();
    
  }

  cargar(){
    
    this.loadingService.mostrarLoading();

    this.parametrosService.cargarParametros(this.desde).subscribe(({total, parametros})=>{
      this.totalRegistros = total;
      this.parametros = parametros;
      this.parametrosTemp = parametros;
      this.totalRegistrosTem = total;
      this.loadingService.ocultarLoading();

      if(this.hasta >= this.totalRegistros){
        this.Sigiente = false;
        this.hasta = this.totalRegistros;
      }else{
        this.Sigiente = true;
      }

      

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

  buscar(termino: string){

    if( termino.length < 2)
    {
       this.parametros = this.parametrosTemp;
       this.totalRegistros = this.totalRegistrosTem;

       this.loadingService.ocultarLoading();

       return;
    }

    this.loadingService.mostrarLoading();
    this.parametrosService.buscar(termino)
        .subscribe(({total, parametros}) => {
          this.totalRegistros = total;
          this.parametros = parametros;
          this.loadingService.ocultarLoading();          
        }
        ,(err)=>{  
          Swal.fire({
            title: '¡Error!',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
          }); 
        });
        
  }

}
