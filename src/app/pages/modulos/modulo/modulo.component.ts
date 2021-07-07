import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { environment } from '../../../../environments/environment';

const nombreApi = environment.nombreApi;

import { ModuloService } from '../../services/modulo.service';
import { LoadingService } from '../../../components/services/loading.service';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styles: [
  ]
})
export class ModuloComponent implements OnInit {

  public moduloForm: FormGroup;
  private id: string;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public moduloService:ModuloService,
    public loadingService: LoadingService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id })=> this.cargarModulo(id));

    this.moduloForm = this.fb.group({
      nombre: ['', Validators.required],
      icono: ['', Validators.required]
    });

  }

  cargarModulo(id: string){

    this.loadingService.mostrarLoading();

    if(id === 'Nuevo'){
      this.loadingService.ocultarLoading();
      return;
    }

    this.moduloService.buscarId(id).pipe(
      delay(100)
    ).subscribe(modulo =>{

      if(!modulo){
        return this.router.navigateByUrl(`${nombreApi}/modulos`);
      }

      this.id = id;

      const {nombre, icono} = modulo;
      this.moduloForm.setValue({nombre,icono});
      this.loadingService.ocultarLoading();

    },
    (err)=>{
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      }); 
      return this.router.navigateByUrl(`${nombreApi}/modulos`);
    });

  }

  guardarModulo(){

    this.loadingService.mostrarLoading();

    if(this.id){

      const data = { ...this.moduloForm.value, _id: this.id};
      
      this.moduloService.actualizar(data).subscribe((resp: any) => {
        
        this.loadingService.ocultarLoading();

        Swal.fire({
          title: 'Actualización exitosa',
          text: `${resp.modulo.nombre}, ${resp.modulo.icono}`,
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) =>{
          return this.router.navigateByUrl(`${nombreApi}/modulos`);
        });

      },
      (err)=>{
        Swal.fire({
          title: '¡Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok'
        }); 
        this.loadingService.ocultarLoading();
      });


    }else{

      const data = { ...this.moduloForm.value};

      this.moduloService.crearModulo(data).subscribe((resp: any) =>{
        
        this.loadingService.ocultarLoading();
        Swal.fire({
          title: 'Creado con éxito',
          text: `${resp.modulo.nombre}, ${resp.modulo.icono}`,
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) =>{
          return this.router.navigateByUrl(`${nombreApi}/modulos`);
        });      

      },
      (err)=>{
        Swal.fire({
          title: '¡Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok'
        }); 
        this.loadingService.ocultarLoading();
      });

    }

  }

}
