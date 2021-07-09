import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../components/services/loading.service';
import { Empresa } from '../models/empresas.model';
import { EmpresasService } from '../services/empresas.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  public empresas: Empresa[];

  constructor(
    private location:Location,

    public loadingService:LoadingService,
    public empresasService:EmpresasService
  ) { }

  ngOnInit(): void {
    this.cargarEmpresas();
  }

  cargarEmpresas(){

    this.loadingService.mostrarLoading();

    this.empresasService.cargarEmpresas().subscribe(({empresas})=>{

      this.empresas = empresas;
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
}
