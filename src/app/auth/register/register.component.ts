import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
  public registerForm = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['',[Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    password2: ['',[Validators.required, Validators.minLength(5)]],
    terminos: [, [Validators.required]]
  });


  constructor(    
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }


  crearUsuario(){

    if (this.registerForm.invalid) {
      return;
    }

    if(!this.registerForm.value.terminos){
      Swal.fire({
        title: 'Importante!',
        text: 'Debe aceptar los términos y condiciones',
        icon: 'error',
        confirmButtonText: 'Ok'
      }); 
      return;
    }

    if(this.registerForm.value.password !== this.registerForm.value.password2){
      Swal.fire({
        title: 'Importante!',
        text: 'Las contraseñas no concuerdan',
        icon: 'error',
        confirmButtonText: 'Ok'
      }); 
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe((resp: any) => {
          
          this.router.navigateByUrl('/');

        }, (err) => {
         
          Swal.fire({
            title: '¡Error!',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
          }); 
          
        });
    
  }

  

}
