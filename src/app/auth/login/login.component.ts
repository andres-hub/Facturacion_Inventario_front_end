import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public auth2:any;

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
    this.renderButton();  
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
 
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  async startApp() {

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));

  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoogle(id_token)
              .subscribe((resp:any)=>{
                
                this.ngZone.run(()=>{
                  this.router.navigateByUrl('/');
                });
             
              },(err)=>{
                Swal.fire({
                  title: '¡Error!',
                  text: err.error.msg,
                  icon: 'error',
                  confirmButtonText: 'Ok'
                }); 
              });
      
        },(error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
