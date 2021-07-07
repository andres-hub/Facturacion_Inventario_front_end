import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoadingService } from '../../../components/services/loading.service';
import { RolesService } from '../../services/roles.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styles: [
  ]
})
export class RolComponent implements OnInit {

  public rolForm: FormGroup;
  private id: string;

  constructor(
    public fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    public loadingService: LoadingService,
    private rolesService: RolesService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id })=> this.cargarRol(id));

    this.rolForm = this.fb.group({
      nombre: ['', Validators.required]
    });

  }

  cargarRol(id: string){

    this.loadingService.mostrarLoading();

    if(id === 'Nuevo'){
      this.loadingService.ocultarLoading();
      return;
    }

    this.rolesService.buscarId(id).pipe(
      delay(100)
    ).subscribe(rol =>{

      if(!rol){
        return this.location.back();
      }

      this.id = id;

      const {nombre} = rol;
      this.rolForm.setValue({nombre});
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
    });



  }

  guardarRol(){

    this.loadingService.mostrarLoading();

    if(this.id){

      const data = { ...this.rolForm.value, _id: this.id};
      
      this.rolesService.actualizar(data).subscribe((resp: any) => {
        
        this.loadingService.ocultarLoading();

        Swal.fire({
          title: 'Actualización exitosa',
          text: `${resp.rol.nombre}.`,
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
      });


    }else{

      const data = { ...this.rolForm.value};

      this.rolesService.crearRol(data).subscribe((resp: any) =>{

        Swal.fire({
          title: 'Creado con éxito',
          text: `${resp.rol.nombre}.`,
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) =>{
          return this.location.back();
        });      
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

  }

}
