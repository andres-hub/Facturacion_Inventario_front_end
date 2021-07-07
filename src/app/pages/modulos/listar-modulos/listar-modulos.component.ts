import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Modulo } from '../../models/modulo.model';
import { ModuloService } from '../../services/modulo.service';
import { LoadingService } from '../../../components/services/loading.service';

@Component({
  selector: 'app-listar-modulos',
  templateUrl: './listar-modulos.component.html',
  styles: [
  ]
})
export class ListarModulosComponent implements OnInit {
  
  public totalRegistros: number = 0;
  public totalRegistrosTem: number = 0;
  public modulos: Modulo[]= [];
  public modulosTem: Modulo[]= [];
  public desde: number = 0;
  public viewDesde: number = 1;
  public hasta: number = 10;
  public intervalo:number = 10;
  public Sigiente: boolean = true;
  public Anterior: boolean = false;

  constructor(
    private moduloService:ModuloService,
    public loadingService: LoadingService
  ) { }

  ngOnInit(): void {    
    this.cargarModulos(); 
  }

  cargarModulos(){
    this.moduloService.cargarModulos(this.desde)
    .subscribe(({total, modulos}) => {
      this.totalRegistros = total;
      this.modulos = modulos;
      this.modulosTem = modulos;
      this.totalRegistrosTem = total;
      this.loadingService.ocultarLoading();

      if(this.hasta >= this.totalRegistros){
        this.Sigiente = false;
        this.hasta = this.totalRegistros;
      }else{
        this.Sigiente = true;
      }

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
      this.hasta += this.intervalo - this.modulos.length;
    }

    this.cargarModulos();
    
  }

  buscar(termino: string){

    if( termino.length < 2)
    {
       this.modulos = this.modulosTem;
       this.totalRegistros = this.totalRegistrosTem;

       this.loadingService.ocultarLoading();

       return;
    }

    this.loadingService.mostrarLoading();
    this.moduloService.buscar(termino)
        .subscribe(({total, modulos}) => {
          this.totalRegistros = total;
          this.modulos = modulos;
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
