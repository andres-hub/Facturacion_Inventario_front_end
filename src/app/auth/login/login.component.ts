import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '' ,[Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    remember:[localStorage.getItem('remember')|| false]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    
  }
  
  login(){
    
    if (this.loginForm.invalid) {
      return;
    }    
    
    this.usuarioService.login(this.loginForm.value)
        .subscribe((resp:any)=>{

          if(this.loginForm.get('remember').value){
            localStorage.setItem('email', this.loginForm.get('email').value);
            localStorage.setItem('remember', this.loginForm.get('remember').value);
          }else{
            localStorage.removeItem('email');
            localStorage.removeItem('remember');
          }


          this.router.navigateByUrl('/');
       
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
