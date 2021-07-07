import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment'
import { RolesService } from '../../services/roles.service';
import { Rol } from '../../models/rol.model';
import { LoadingService } from '../../../components/services/loading.service';

@Component({
  selector: 'app-listar-roles',
  templateUrl: './listar-roles.component.html',
  styles: [
  ]
})
export class ListarRolesComponent implements OnInit {

  public nombreApp: string = environment.nombreApi;
  public totalRegistros: number = 0;
  public totalRegistrosTem: number = 0;
  public roles: Rol[]= [];
  public rolesTem: Rol[]= [];
  public desde: number = 0;
  public viewDesde: number = 1;
  public hasta: number = 10;
  public intervalo:number = 10;
  public Sigiente: boolean = true;
  public Anterior: boolean = false;

  constructor(
    public loadingService: LoadingService,
    private rolesService: RolesService
  ) { }

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(){
    this.rolesService.cargarRoles(this.desde)
    .subscribe(({total, roles}) => {
      this.totalRegistros = total;
      this.roles = roles;
      this.rolesTem = roles;
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
      this.loadingService.ocultarLoading();
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
      this.hasta += this.intervalo - this.roles.length;
    }

    this.cargarRoles();
    
  }

  buscar(termino: string){

  }

}
