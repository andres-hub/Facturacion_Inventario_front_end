import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
 
import { LoadingService } from '../../../components/services/loading.service';
import { EntidadesService } from '../../services/entidades.service';

import { Entidad } from '../../models/entidad.model';
import { Modulo } from '../../models/modulo.model';
import { ModuloService } from '../../services/modulo.service';
import { Accion } from '../../models/accion.model';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styles: [
  ]
})
export class EntidadComponent implements OnInit {

  public Form: FormGroup;
  public entidad: Entidad;
  private id: string;
  public modulos: Modulo [];
  public acciones: Accion[] = [];

  constructor(
    public fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public loadingService:LoadingService,
    private entidadesService:EntidadesService,
    public moduloService: ModuloService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id })=> this.cargar(id));

    this.cargarModulos();

    this.Form = this.fb.group({
      nombre: ['', Validators.required],
      url:['',Validators.required],
      modulo:['', Validators.required]
    });  

  }

  trackByFn(index: any) {
     return index; 
  } 

  cargar(id: string){

    
    if( id  === 'Nuevo'){
      this.loadingService.ocultarLoading();
      return;
    }

    this.id = id;

    this.loadingService.mostrarLoading();
    
    this.entidadesService.buscarId(id).subscribe(entidad => {

      if(!entidad){
        return this.location.back();
      }

      const {nombre,modulo, url} = entidad;

      this.entidad = entidad;
      this.acciones = entidad.acciones;

      this.Form.setValue({nombre, modulo, url});

      this.loadingService.ocultarLoading();

    },
    (err)=>{
      console.log(err);
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return this.location.back();
    });

  }

  cargarModulos(){

    this.loadingService.mostrarLoading();

    this.moduloService.allModulos().subscribe(modulos=>{
      this.modulos = modulos;
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
    )

  }

  agregarPermiso(){
    
    this.acciones.push({alias: '', accion: '', url: ''});

  }

  eliminarPermiso(item){

    const i = this.acciones.indexOf( item );
    this.acciones.splice( i, 1 );
  }

  guardar(){
    
    this.loadingService.mostrarLoading();

    if(this.id){

      const data: Entidad = { ...this.Form.value, _id: this.id };

      data.acciones = this.entidad.acciones; 

      this.entidadesService.actualizarEntidad(data).subscribe((resp:any)=>{

        this.loadingService.ocultarLoading();

        Swal.fire({
          title: 'Actualización exitosa',
          text: `${resp.entidad.nombre}.`,
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
      }
      );

    }else{

      const data: Entidad = { ...this.Form.value};

      data.acciones = this.acciones;
      console.log("object");

      this.entidadesService.crearEntidad(data).subscribe((resp: any)=>{

        this.loadingService.ocultarLoading();

        Swal.fire({
          title: 'Creado con éxito',
          text: `${resp.entidad.nombre}.`,
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
        
        this.loadingService.ocultarLoading();
      }
      )

    }




  }

}
