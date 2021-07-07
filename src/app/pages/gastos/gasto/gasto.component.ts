import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { LoadingService } from '../../../components/services/loading.service';
import { GastosService } from '../../services/gastos.service';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styles: [
  ]
})
export class GastoComponent implements OnInit {

  public gastoForm: FormGroup;
  public credito: boolean = false;
  private id: string;
  public mensual: Boolean = false;

  constructor(
    public fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    public loadingService: LoadingService,
    private gastosService: GastosService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id}) => this.cargarIngreso(id));

    this.gastoForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      numeroCuotas: [''],
      efectivoAnual: [''],
      frecuencia: ['', Validators.required],
      quincena: ['', Validators.required],
      valor: ['', Validators.required]      
    });

  }

  cargarIngreso(id: string){

    if(id == 'Nuevo'){
      this.loadingService.ocultarLoading();
      return;
    }

    this.gastosService.cargarGasto(id)
    .subscribe(gasto => {

      if(!gasto){
        return this.location.back();
      }
     
      this.id = id;

      const {nombre, tipo, numeroCuotas, efectivoAnual, frecuencia, quincena, valor } = gasto;
      
      this.gastoForm.setValue({nombre, tipo, numeroCuotas, efectivoAnual, frecuencia, quincena, valor});
      this.loadingService.ocultarLoading();
    
      this.credito = (tipo == "Crédito")? true: false;
      this.mensual = (frecuencia == 'Mensual')? true: false; 

    },
    (err)=>{
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return this.location.back();
    }
    );

  }

  cambioTipo(){

    const { tipo } = this.gastoForm.value;
    
    this.credito = (tipo == "Crédito")? true: false;

  }

  guardar(){

    this.loadingService.mostrarLoading();

    if(this.id){

      const data = { ...this.gastoForm.value, _id: this.id };

      this.gastosService.actulizarGasto(data)
      .subscribe((resp: any)=>{

        this.loadingService.ocultarLoading();

        Swal.fire({
          title: 'Actualización exitosa',
          text: `${resp.gasto.nombre}.`,
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
      }
      );
      return;
    }

    const data = { ...this.gastoForm.value };
  
    this.gastosService.crearGasto(data).subscribe((resp: any)=>{

      this.loadingService.ocultarLoading();

      Swal.fire({
        title: 'Creado con éxito',
        text: `${resp.gasto.nombre}.`,
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
    }
    );

  }

  cambioFrecuencia(){
    
    const {frecuencia} = this.gastoForm.value;
    
    this.mensual = (frecuencia == 'Mensual')? true: false; 

  }

}
