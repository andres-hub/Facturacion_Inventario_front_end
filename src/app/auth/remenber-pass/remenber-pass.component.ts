import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-remenber-pass',
  templateUrl: './remenber-pass.component.html',
  styleUrls: ['./remenber-pass.component.css']
})
export class RemenberPassComponent implements OnInit {

  public remenberForm = this.fb.group({
    email: ['' ,[Validators.email]]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
  }

  remenberPass(){

    if (this.remenberForm.invalid) {
      return;
    }  

    this.usuarioService.solicitarCodigo(this.remenberForm.get('email').value).subscribe((resp:any)=>{
      this.router.navigateByUrl('/login');
      Swal.fire({
        title: '¡Solicitud exitosa!',
        text: resp.msg,
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

}
