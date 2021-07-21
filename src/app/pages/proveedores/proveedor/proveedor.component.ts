import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { LoadingService } from '../../../components/services/loading.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { Location } from '@angular/common';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  public proveedorForm: FormGroup;
  private id: string;

  constructor(
    private activatedRoute:ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private loadingService: LoadingService,
    private proveedoresService: ProveedoresService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id})=> this.cargarProveedor(id));

    this.proveedorForm = this.fb.group({
      Nombre: ['', Validators.required],
      Direccion:[''],
      NIT:[''],
      Telefono:['', Validators.required],
      Correo: ['']
    });

  }

  cargarProveedor(id: string){

    this.loadingService.mostrarLoading();
    
    if(id === 'Nuevo'){
      this.loadingService.ocultarLoading();
      return;
    }

    this.proveedoresService.cargarProveedor(id).pipe(
      delay(100)
    ).subscribe(proveedor =>{

      if(!proveedor){
        return this.location.back();
      }

      this.id = id;
      
      const { Nombre, Direccion, NIT, Telefono, Correo } = proveedor;

      this.proveedorForm.setValue({Nombre, Direccion, NIT, Telefono, Correo});
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

  guardarProveedor(){

    this.loadingService.mostrarLoading();

    if(this.id){

      const data = { ...this.proveedorForm.value, _id: this.id };

      this.proveedoresService.actualizarProveedor(data).subscribe((resp:any)=>{

        this.loadingService.ocultarLoading();

        Swal.fire({
          title: 'Actualización exitosa',
          text: `${resp.proveedor.Nombre}.`,
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) =>{
          return this.location.back();
        });

      },(err)=>{
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

    const data = {...this.proveedorForm.value};

    this.proveedoresService.crearProveedor(data).subscribe((resp:any)=>{

      this.loadingService.ocultarLoading();
      
      Swal.fire({
        title: 'Creado con éxito.',
        text: `${resp.proveedor.Nombre}.`,
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result) =>{
        return this.location.back();
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
    });

  }

}
