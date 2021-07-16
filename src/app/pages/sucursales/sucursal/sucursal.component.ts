import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Sucursal } from '../../models/sucursal.model';
import { Location } from '@angular/common';
import { LoadingService } from '../../../components/services/loading.service';
import { SucursalesService } from '../../services/sucursales.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {

  public sucursal: Sucursal;
  public sucursalForm: FormGroup;
  public id: string;

  constructor(
    private fb: FormBuilder,
    private location:Location,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private sucursalesService: SucursalesService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id})=> this.cargarSucursal(id))

    this.sucursalForm = this.fb.group({
      Nombre: ['', Validators.required],
      Direccion:['', Validators.required],
      Telefono:['']
    });

  }

  cargarSucursal(id:string){
    console.log(id);
    this.loadingService.mostrarLoading();

    if(id === 'Nuevo'){
      this.loadingService.ocultarLoading();
      return;
    }

    this.sucursalesService.cargarSucursalId(id).pipe(
      delay(100)
    ).subscribe(sucursal =>{

      if(!sucursal){
        return this.location.back();
      }

      this.id = id;

      const { Nombre, Direccion, Telefono } = sucursal;
      this.sucursalForm.setValue({Nombre, Direccion, Telefono});
      this.loadingService.ocultarLoading();

    },
    (err)=>{
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return this.location.back();
    }
    );

  }

  guardarSucursal(){

    this.loadingService.mostrarLoading();

    if(this.id){

      const data = {...this.sucursalForm.value, _id: this.id};

      this.sucursalesService.actualizarSucursal(data).subscribe((resp:any)=>{
        
        this.loadingService.ocultarLoading();

        Swal.fire({
          title: 'Actualización exitosa',
          text: `${resp.sucursal.Nombre}.`,
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) =>{
          return this.location.back();
        });

      },
      (err)=>{
        Swal.fire({
          title: '¡Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return this.location.back();
      });

      return;
    }

    const data = {...this.sucursalForm.value};

    this.sucursalesService.crearSucursal(data).subscribe((resp: any)=>{

      this.loadingService.ocultarLoading();
      Swal.fire({
        title: 'Creado con éxito',
        text: `${resp.sucursal.Nombre}.`,
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result) =>{
        return this.location.back();
      });      

    },
    (err)=>{
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
