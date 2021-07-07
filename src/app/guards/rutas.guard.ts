import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LoadingService } from '../components/services/loading.service';
import { PermisosService } from '../pages/services/permisos.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RutasGuard implements CanActivate {
  
  constructor( 
    private router: Router,
    private loadingService: LoadingService,
    private permisosService: PermisosService
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      const ruta = next.routeConfig.path;
      
      if(ruta.length > 0){
        
        this.loadingService.mostrarLoading();

        return this.permisosService.validarRuta(next.routeConfig.path)
         .pipe(                     
           tap( acceso => { 
             if(!acceso){    
                                   
               this.router.navigateByUrl('/');
             }
           })
         );
      }else{
        return true;
      }
  }
  
}
