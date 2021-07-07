import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../auth/services/usuario.service';
import { LoadingService } from '../components/services/loading.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CambioPassGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService,
    private router: Router,
    private loadingService: LoadingService
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      const token = route.params.token;
      this.loadingService.mostrarLoading();
      
      return this.usuarioService.validarTokenCambioPass(token)
      .pipe(                     
        tap(vaildo => {                      
          if(!vaildo){ 
            Swal.fire({
              title: '¡Error!',
              text: 'Link invalido.',
              icon: 'error',
              confirmButtonText: 'Ok'
            });                        
            this.router.navigateByUrl('/login');
          }
        })
      );

      return true;
  }
  
}
