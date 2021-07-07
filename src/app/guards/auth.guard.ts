import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../auth/services/usuario.service';
import { tap } from 'rxjs/operators';
import { LoadingService } from '../components/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService,
               private router: Router,
               private loadingService: LoadingService
               ) {}

  canActivate(
    
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    this.loadingService.mostrarLoading();
    
    return this.usuarioService.validarToken()
                .pipe(                     
                  tap(estaAutenticado => {                      
                    if(!estaAutenticado){                        
                      this.router.navigateByUrl('/login');
                    }
                  })
                );

    
  }
  
}
