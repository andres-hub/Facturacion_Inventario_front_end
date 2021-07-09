import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interfase';
import { CargarUsuarios } from '../../pages/interfaces/cargar-usuarios-interface';

import { Usuario } from '../models/usuario.model';
import { ActualizarUsuarioForm } from '../../pages/interfaces/actualizar-usuario-form.interfase';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  
  public usuario: Usuario;
  

  constructor(private http: HttpClient,
              private router: Router,
              ) {
               
               }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){

    return {
      headers:{
        'x-token': this.token
      }
    }

  }

  get uid():string{
    return this.usuario.uid;
  }  

  private convertirUsuarios(resp: any[]): Usuario[]{

    return resp.map(
      usuario => new Usuario(
          usuario.uid,
          usuario.email,
          usuario.nombre,
          usuario.estado,
          usuario.img,
          usuario.google,
          usuario.role
        )
      );
  }

  guardarStorage(token: string, menu: any){

    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));

  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean>{

    return this.http.get(`${base_url}/login/renew`, {
      headers:{'x-token': this.token}
    })
    .pipe(
      map((resp: any) =>{
        const {email, estado, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario(uid,email,nombre, estado,img, google, role);
        this.guardarStorage(resp.token, resp.menu);
        return true;
      }),
      catchError(error => of(false))
    );

  }  

  validarTokenCambioPass(token): Observable<boolean>{

    return this.http.get(`${base_url}/login/ValidarCambioPass`, {
      headers:{'x-token': token}
    })
    .pipe(
      map((resp: any) =>{
        return true;
      }),
      catchError(error => of(false))
    );

  } 

  crearUsuario(formData: RegisterForm ){

    return this.http.post(`${base_url}/usuarios`, formData)
                .pipe(
                  tap((resp: any) =>{
                    this.guardarStorage(resp.token, resp.menu);
                  })
                );

  }

  actualizarPerfil(data:ActualizarUsuarioForm){
    return this.http.put(`${base_url}/usuarios`, data,{
      headers:{ 'x-token': this.token }
    })
  }

  login(formData: LoginForm){

    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap((resp: any) =>{
                    localStorage.setItem('token', resp.token);
                    localStorage.setItem('menu', resp.menu);
                  })
                );

  }

  loginGoogle(token){

    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap((resp: any) =>{
        this.guardarStorage(resp.token, resp.menu);
      })
    );

  }

  cargarUsuarios(desde:Number = 0){

    const url = `${base_url}/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuarios>(url, this.headers )
                .pipe(
                  map(resp =>{

                    const usuarios = this.convertirUsuarios(resp.usuarios);

                    return {
                      total: resp.total,
                      usuarios
                    };
                  })
                );



  }

  buscar(termino: string){

    const url = `${base_url}/usuarios/buscar/${termino}`;

    return this.http.get<CargarUsuarios>(url, this.headers)
                .pipe(
                  map((resp: any) =>{

                    const usuarios = this.convertirUsuarios(resp.usuarios);

                    return {
                      total: resp.total,
                      usuarios
                    };

                  })
                )

  }

  cambiarEstado(usuario: Usuario){

    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);

  }

  actualizarRol(ussuario:Usuario){
    return this.http.put(`${base_url}/usuarios/role/${ussuario.uid}`, ussuario,{
      headers:{ 'x-token': this.token }
    })
  }

  solicitarCodigo(email: string){
    
    return this.http.post(`${base_url}/login/codigo`, {email});

  }

  cambiarPass(token: string, pass: string){
    console.log(token);
    return this.http.put(`${base_url}/login/cambiarPass`, {pass},
    {headers:{ 'x-token': token }})
    .pipe(
      tap((resp: any) =>{
        console.log(resp);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', resp.menu);
      })
    );

    

  }
  
}
