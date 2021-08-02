import { Component, OnInit } from '@angular/core';

import { Proveedor } from '../../models/proveedor.model';
import { LoadingService } from '../../../components/services/loading.service';
import { ProveedoresService } from '../../services/proveedores.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
@Component({
  selector: 'app-listar-proveedores',
  templateUrl: './listar-proveedores.component.html',
  styleUrls: ['./listar-proveedores.component.css']
})
export class ListarProveedoresComponent implements OnInit {

  public desde: number = 0;
  public totalRegistros: Number = 0;
  public mostrandoDesde: Number = 0;
  public mostrandoHasta: Number = 0;
  public proveedores: Proveedor[];

  

  constructor(
    private location: Location,
    private loadingService: LoadingService,
    private proveedoresService: ProveedoresService
  ) { }

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores(){
    this.loadingService.mostrarLoading();

    this.proveedoresService.cargarProveedores(this.desde)
    .subscribe(({total, proveedores})=>{
      this.totalRegistros = total;
      this.proveedores = proveedores;
      this.mostrandoDesde = 1;
      this.mostrandoHasta = proveedores.length;
      this.loadingService.ocultarLoading();

    },(err)=>{
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return this.location.back();
    });

  }

  cargarContactos(){

    Swal.fire({
      title: 'En construcción.',
      text: `Aquí podrás ver crear y editar a las personas de contacto de este proveedor.`,
      icon: 'info',
      confirmButtonText: 'Ok'
    });

  }

}
