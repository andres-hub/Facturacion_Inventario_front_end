import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { LoadingService } from '../../components/services/loading.service';
import { PermisosService } from '../services/permisos.service';
import { Menu } from '../models/menu.model';
import { Permiso } from '../models/permisos.model';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styles: [
  ]
})
export class PermisosComponent implements OnInit {

  public menu: Menu[];
  public permisos:Permiso[] = []; 
  public nombre: string;
  private id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location:Location,
    public loadingService: LoadingService,    
    private permisosService: PermisosService,
    private rolesService: RolesService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id, tipo })=> this.cargarParametros(id, tipo));

  }

  cargarParametros(id:string, tipo: 'rol'| 'user'){

    this.id = id;

    this.cargarTipo(tipo);
    
    this.cargarAcciones();
    
    this.cargarPermisos();

  }

  cargarPermisos(){

    this.loadingService.mostrarLoading();

    this.permisosService.cargarPermisos(this.id).subscribe((resp:Permiso[]) => {

      this.permisos = resp;
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
  
  cargarAcciones() {

    this.loadingService.mostrarLoading();

    this.permisosService.cargarAcciones(this.id).subscribe((resp: any) => {
      this.menu = resp;
      this.loadingService.ocultarLoading();
    },
      (err) => {
        Swal.fire({
          title: '¡Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return this.location.back();
      });
  }

  cargarTipo(tipo: string) {
    switch (tipo) {
      case 'user':
        this.cargarUsuario();
        break;
      case 'rol':
        this.cargarRol();
        break;
      default:
        Swal.fire({
          title: '¡Error!',
          text: 'El tipo no es valido',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return this.location.back();
    }
  }

  cargarUsuario(){

  }

  cargarRol(){

    this.loadingService.mostrarLoading();

    this.rolesService.buscarId(this.id).pipe(
      delay(100)
    ).subscribe(rol =>{

      if(!rol){
        return this.location.back();
      }

      this.nombre = rol.nombre;

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

  cambio(modulo:string,entidad:string,accion:string, event){

    if(event.target.checked){
     
      this.permisos.push({
        modulo,
        entidad,
        accion
      });

    }else{
      
      const i = this.permisos.findIndex( v=> v.accion == accion );
      this.permisos.splice( i, 1 );

    }

  }

  guardar(){

    this.loadingService.mostrarLoading();

    this.permisosService.asignarPermisos(this.id, this.permisos).subscribe((resp: any)=>{

      this.loadingService.ocultarLoading();

      Swal.fire({
        title: 'Permisos asignados con éxito',
        text: `${this.nombre}`,
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
    )


  }

}
