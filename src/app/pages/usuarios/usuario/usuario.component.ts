import  { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../components/services/loading.service';
import { UsuarioService } from 'src/app/auth/services/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['',[Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    password2: ['',[Validators.required, Validators.minLength(5)]],
    terminos: [, [Validators.required]]
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public loadingService: LoadingService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id })=> this.cargarUsuarios(id));
  }

  cargarUsuarios(id: string){

    this.loadingService.mostrarLoading();

    if(id === 'Nuevo'){
      this.loadingService.ocultarLoading();
      return;
    }
    
  }

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
