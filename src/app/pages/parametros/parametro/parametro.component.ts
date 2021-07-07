import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../../components/services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { ParametrosService } from '../../services/parametros.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styles: [
  ]
})
export class ParametroComponent implements OnInit {

  public parametroFrom: FormGroup;

  private id: string;

  constructor(
    public fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public loadingService: LoadingService,
    private parametrosService: ParametrosService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id})=>{ this.cargarParametro(id) })

    this.parametroFrom = this.fb.group({
      nombre: ['', Validators.required],
      valor: ['', Validators.required],
      estado: []
    })

  }

  cargarParametro(id: string){

    if(id === 'Nuevo'){

      this.loadingService.ocultarLoading();

      return;

    }

    this.id = id;

    this.loadingService.mostrarLoading();

    this.parametrosService.buscarId(this.id).pipe(delay(100)).
        subscribe(parametro =>{

          if(!parametro){

            return this.location.back();

          }

          const {nombre, valor, estado} = parametro;

          this.parametroFrom.setValue({nombre, valor, estado});

          this.loadingService.ocultarLoading();

        },
        (err)=>{
          Swal.fire({
            title: '¡Error!',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          return this.location.back();
        })

  }

  guardarParametro(){

    this.loadingService.mostrarLoading();

    if(this.id){

      const data = {...this.parametroFrom.value, _id: this.id};

      this.parametrosService.actualizar(data).subscribe((resp:any) => {

        this.loadingService.ocultarLoading();

        Swal.fire({
          title: 'Actualización exitosa',
          text: `${resp.parametro.nombre}, ${resp.parametro.valor}`,
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) =>{
          return this.location.back();
        });

      },
      (err)=>{
        Swal.fire({
          title: '¡Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return this.location.back();
      })
      

    }else{

      const data = { ...this.parametroFrom.value };
  
      this.parametrosService.crearParametro(data).subscribe((resp:any) =>{
  
        Swal.fire({
          title: 'Creado con éxito',
          text: `${resp.parametro.nombre}, ${resp.parametro.valor}`,
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) =>{
          return this.location.back();
        }); 
  
      },
      (err)=>{
        console.log(err);
        Swal.fire({
          title: '¡Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return this.location.back();
      });
  

    }

  }



}
