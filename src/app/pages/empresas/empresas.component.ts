import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { LoadingService } from '../../components/services/loading.service';
import { Empresa } from '../models/empresa.model';
import { EmpresasService } from '../services/empresas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargarEmpresa } from '../interfaces/cargar-empresa';

declare var $: any; 

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  public empresa: Empresa;
  public empresaForm: FormGroup;

  constructor(
    private  fb: FormBuilder,
    private location:Location,
    public loadingService:LoadingService,
    public empresasService:EmpresasService
  ) { }

  ngOnInit(): void {

    $('.dropify').dropify({   
      messages: {
        'default': 'Arrastre y suelte un archivo aquí o haga clic aquí',
        'replace': 'Arrastra y suelta o haz clic para reemplazar',
        'remove':  'Eliminar',
        'error':   'Vaya, sucedió algo mal.'
    },
    error: {
      'fileSize': 'El tamaño del archivo es demasiado grande (máximo {{ value }}).',
      'fileExtension': 'El formato de imagen no está permitido (solo {{ value }}).'
    }      
  });
    this.empresaForm = this.fb.group({
      Nombre: ['', Validators.required],
      Direccion: [''],
      NIT: [''],
      Telefono: ['']
    });
    this.cargarEmpresa();
  }

  cargarEmpresa(){

    this.loadingService.mostrarLoading();

    this.empresasService.cargarEmpresa().subscribe(({empresa})=>{

      this.loadingService.ocultarLoading();
      if(!empresa)
          return;
      this.empresa = empresa;
      var {Nombre,Direccion,NIT,Telefono} = empresa;
      this.empresaForm.setValue({Nombre,Direccion,NIT,Telefono});

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

  guardarEmpresa(){

    this.loadingService.mostrarLoading();

    this.empresa = { ...this.empresaForm.value };

    this.empresasService.crearEmpresa(this.empresa).subscribe((res: any)=>{

      this.loadingService.ocultarLoading();
      this.empresa = res.empresa;
      Swal.fire({
        title: 'Transacción exitosa.',
        text: `${this.empresa.Nombre}.`,
        icon: 'success',
        confirmButtonText: 'Ok'
      });

    },
    (err)=>{
      this.loadingService.ocultarLoading();
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    );

  }

  guardarLogo(){
    Swal.fire({
      title: 'En construcción.',
      text: `Aquí podrás subir el logo de tu empresa.`,
      icon: 'info',
      confirmButtonText: 'Ok'
    });
  }

}
