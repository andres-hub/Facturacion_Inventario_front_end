import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/auth/models/usuario.model';

import { UsuarioService } from '../../../auth/services/usuario.service';
import { LoadingService } from '../../../components/services/loading.service';
import { RolesService } from '../../services/roles.service';
import { Rol } from '../../models/rol.model';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  public roles: Rol[] = [];
  public totalUsuarios: number = 0;
  public totalUsuariosTem: number = 0;
  public usuarios: Usuario[]= [];
  public usuariosTem: Usuario[]= [];
  public desde: number = 0;
  public viewDesde: number = 1;
  public hasta: number = 10;
  public intervalo:number = 10;
  public Sigiente: boolean = true;
  public Anterior: boolean = false;

  constructor( 
    private usuarioService: UsuarioService,
    public loadingService: LoadingService,
    private rolesService: RolesService
    ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarRoles();
  }

  cargarUsuarios(){
    this.loadingService.mostrarLoading();
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe(({total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTem = usuarios;
      this.totalUsuariosTem = total;
      this.loadingService.ocultarLoading();


      if(this.hasta >= this.totalUsuarios){
        this.Sigiente = false;
        this.hasta = this.totalUsuarios;
      }else{
        this.Sigiente = true;
      }

    });

  }

  cambiarPagina(valor: number){

    this.desde += valor;
    this.hasta += valor;
    this.viewDesde += valor;

    if(this.hasta >= this.totalUsuarios){
      this.Sigiente = false;
      this.hasta = this.totalUsuarios;
    }else{
      this.Sigiente = true;
    }

    if( this.desde === 0 ){
      this.Anterior = false;
    }else{
      this.Anterior = true;
    }

    if(this.viewDesde === this.hasta){
      this.hasta += this.intervalo - this.usuarios.length;
    }

    this.cargarUsuarios();
    
  }

  buscar(termino: string){

    if( termino.length < 2)
    {
       this.usuarios = this.usuariosTem;
       this.totalUsuarios = this.totalUsuariosTem;
       return;
    }

    this.loadingService.mostrarLoading();
    this.usuarioService.buscar(termino)
        .subscribe(({total, usuarios}) => {
          this.totalUsuarios = total;
          this.usuarios = usuarios;
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

  cambiarEstadoUsuario(usuario:Usuario){

    if(usuario.uid === this.usuarioService.uid){
      return Swal.fire('Error', `No puede cambiar su estado a si mismo`, 'error');
    }   

    let estado = (usuario.estado)? "inactivar": "activar";

    Swal.fire({
      title: '¿Cambiar estado?',
      text:`Está apunto de ${estado} a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      
      if (result.isConfirmed) {

        this.loadingService.mostrarLoading();

        this.usuarioService.cambiarEstado(usuario)
            .subscribe((resp:any) =>{
              this.loadingService.ocultarLoading();
              this.cargarUsuarios();
              estado = (resp.usuario.estado)? "Activado": "Inactivado";
              Swal.fire('Activado', `${usuario.nombre} ${estado} con éxito`, 'success');
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
    })

  }

  cambiarRole( usuario:Usuario ) {
     
    this.loadingService.mostrarLoading();

    this.usuarioService.actualizarRol( usuario )
      .subscribe( resp => {
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
        this.cargarUsuarios();
      });
  }

  cargarRoles(){

    this.loadingService.mostrarLoading();
    
    this.rolesService.cargarRolesAll().subscribe(({roles})=>{
      this.roles = roles;
      this.loadingService.ocultarLoading();
    },
    (err)=>{
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });  
    })

  }

}
