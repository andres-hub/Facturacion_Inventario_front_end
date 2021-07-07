import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../../components/services/loading.service';
import { IngresosService } from '../../services/ingresos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styles: [
  ]
})
export class IngresoComponent implements OnInit {

  private id: string;
  public ingresoForm: FormGroup;
  public mensual: Boolean = false;

  constructor(
    public fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    public loadingService: LoadingService,
    private ingresosService: IngresosService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id}) => this.cargarIngreso(id));

    this.ingresoForm = this.fb.group({
      nombre: ['', Validators.required],
      frecuencia: ['', Validators.required],
      quincena: ['', Validators.required],
      valor: ['', Validators.required],     
    });

  }

  cargarIngreso(id: string){

    this.loadingService.mostrarLoading();
    
    if(id === 'Nuevo'){
      this.loadingService.ocultarLoading();
      return;
    }

    this.ingresosService.cargarIngreso(id)
    .subscribe(ingreso => {

      if(!ingreso){
        return this.location.back();
      }
     
      this.id = id;
      const { nombre, frecuencia, quincena, valor } = ingreso;     

      this.ingresoForm.setValue({nombre, frecuencia, quincena, valor});
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
    }
    );


  }

  cambioTipo(){

    const {frecuencia} = this.ingresoForm.value;
    
    this.mensual = (frecuencia == 'Mensual')? true: false; 

  }

  guardar(){

    this.loadingService.mostrarLoading();
    
    if(this.id){

      const data = { ...this.ingresoForm.value, _id: this.id };

      this.ingresosService.actulizarIngreso(data)
      .subscribe((resp: any)=>{

        this.loadingService.ocultarLoading();

        Swal.fire({
          title: 'Actualización exitosa',
          text: `${resp.ingreso.nombre}.`,
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

    const data = { ...this.ingresoForm.value };

    this.ingresosService.crearIngreso(data).subscribe((resp: any)=>{

      this.loadingService.ocultarLoading();

      Swal.fire({
        title: 'Creado con éxito',
        text: `${resp.ingreso.nombre}.`,
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result) =>{
        return this.location.back();
      });   

    },(err)=>{
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
