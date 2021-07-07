import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { UsuarioService } from '../../auth/services/usuario.service';
import { Usuario } from '../../auth/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;

  constructor( public sidebarService: SidebarService,
               private usuarioService: UsuarioService ) { 
    this.usuario = usuarioService.usuario;    
  }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
  }

  accion(msg: string){
    Swal.fire({
      title: 'En construcción',
      text: msg,
      icon: 'info',
      confirmButtonText: 'Ok'
    }); 
  }

}
