import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { LoadingService } from '../../../components/services/loading.service';
import { Entidad } from '../../models/entidad.model';
import { EntidadesService } from '../../services/entidades.service';

@Component({
  selector: 'app-listar-entidades',
  templateUrl: './listar-entidades.component.html',
  styles: [
  ]
})
export class ListarEntidadesComponent implements OnInit {


  private moduloId: string;
  public totalRegistros: number = 0;
  public totalRegistrosTem: number = 0;
  public entidades: Entidad[]= [];
  public entidadesTem: Entidad[]= [];
  
  
  public desde: number = 0;
  public viewDesde: number = 1;
  public hasta: number = 10;
  public intervalo:number = 10;
  public Sigiente: boolean = true;
  public Anterior: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public loadingService:LoadingService,
    private location: Location,
    private entidadesService: EntidadesService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id })=> this.moduloId = id);
    this.cargarEntidades();
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
      this.hasta += this.intervalo - this.entidades.length;
    }

    this.cargarEntidades();
    
  }

  cargarEntidades(){

    this.loadingService.mostrarLoading();

    this.entidadesService.cargarEntidades(this.moduloId,this.desde).subscribe(({total, entidades}) =>{
      this.totalRegistros = total;
      this.entidades = entidades;
      this.entidadesTem = entidades;
      this.totalRegistrosTem = total;

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
        return this.location.back();
      });
  }

  buscar(termino: string){

    
    if( termino.length < 2)
    {
       this.entidades = this.entidadesTem;
       this.totalRegistros = this.totalRegistrosTem;

       this.loadingService.ocultarLoading();

       return;
    }

    this.loadingService.mostrarLoading();
    
    this.entidadesService.buscar(this.moduloId, termino).subscribe(({total, entidades}) => {
      this.totalRegistros = total;
      this.entidades = entidades;
      this.loadingService.ocultarLoading();          
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

}
