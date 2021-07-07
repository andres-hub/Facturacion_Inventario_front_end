import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Usuario } from '../../auth/models/usuario.model';
import { UsuarioService } from '../../auth/services/usuario.service';
import { FileUploadService } from '../services/file-upload.service';
import { LoadingService } from '../../components/services/loading.service';

declare var $: any; 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  
  constructor( private  fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService,
               private loadingService: LoadingService 
              ){
                 this.usuario = usuarioService.usuario;  
              }

  ngOnInit(): void {

    $('.dropify').dropify({   
        defaultFile:  this.imagenTempora(),     
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

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });

    this.loadingService.ocultarLoading();
    
  }

  actualizarPerfil(){
    
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
        .subscribe((resp: any)=>{
          const {email, nombre} = resp.usuario;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
          Swal.fire({
            title: 'Actualización exitosa',
            text: `${email}, ${nombre}`,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        },(err)=>{
          Swal.fire({
            title: '¡Error!',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
          }); 
        });
  }

  actulizarAvatar(archivo: File){  
    this.imagenSubir = archivo;
  }

  subirImagen(){
    if(this.imagenSubir){
      this.fileUploadService.subirArchivo(this.imagenSubir, 'usuarios')
          .then(img =>{ 
            this.usuario.img = img;           
          });
    }
  }


  imagenTempora(){
    return (this.usuario.imagenUrl.includes('https:'))? "" : this.usuario.imagenUrl;
  } 

}
