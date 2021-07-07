import { Component, OnDestroy} from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {filter, map} from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { Miga } from '../../pages/interfaces/miga-interfase';

@Component({
  selector: 'app-breadcrumds',
  templateUrl: './breadcrumds.component.html',
  styles: [
  ]
})
export class BreadcrumdsComponent implements OnDestroy {
   
  public titulo: string;
  public rutas: Miga[] = [];
  public tituloSubs$: Subscription;
  public nombreAppi: string = environment.nombreApi;

  constructor( private router: Router ) { 
    this.tituloSubs$ = this.getArgumentosRuta()
                              .subscribe((res: any) => {
                               this.miga(res);
                              });
  }
  
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta(){

    console.log(this.router.events);

    return this.router.events
      .pipe(
        filter(event =>  event instanceof ActivationEnd),
        filter((event: ActivationEnd) =>  event.snapshot.firstChild === null),
        map((event: ActivationEnd) =>  event.snapshot )
      );    
  }

  miga(res: any){

    this.titulo =res.data.titulo;
    this.rutas = res.data.rutas;   
    if(this.rutas != undefined){
      
      this.rutas.forEach(ruta =>{
        const parte = ruta.url.split('/');
        var ultimo = parte[parte.length - 1];
        if(ultimo == ':id'){          
          parte[parte.length - 1] = res._urlSegment.segments[parte.length];
          ruta.url = parte.join('/');
        }
      })

    }
    
    // TODO: Poner el nombre de la app
    document.title = `${this.nombreAppi} - ${res.data.titulo}`;

  }

}
