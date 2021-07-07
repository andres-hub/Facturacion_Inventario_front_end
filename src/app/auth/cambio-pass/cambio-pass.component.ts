import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-cambio-pass',
  templateUrl: './cambio-pass.component.html',
  styleUrls: ['./cambio-pass.component.css']
})
export class CambioPassComponent implements OnInit {

  public canghePassFrom = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(5)]],
    password2: ['', [Validators.required, Validators.minLength(5)]],
  });
  private token: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute  
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({token}) => this.token = token);
  }

  canghePass(){
    console.log(this.token);
    if (this.canghePassFrom.invalid) {
      return;
    }

    if(this.canghePassFrom.value.password !== this.canghePassFrom.value.password2){
      Swal.fire({
        title: 'Importante!',
        text: 'Las contraseñas no concuerdan',
        icon: 'error',
        confirmButtonText: 'Ok'
      }); 
      return;
    }

    this.usuarioService.cambiarPass(this.token, this.canghePassFrom.value.password)
    .subscribe((resp:any)=>{
      this.router.navigateByUrl('/');
    },(err)=>{
      
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      }); 
      this.router.navigateByUrl('/login');
    });


  }

}
