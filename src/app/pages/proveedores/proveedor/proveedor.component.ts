import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../../components/services/loading.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  public proveedorForm: FormGroup;
  private id: string;

  constructor(
    private activatedRoute:ActivatedRoute,
    private fb: FormBuilder,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id})=> this.cargarProveedor(id));

    this.proveedorForm = this.fb.group({
      Nombre: ['', Validators.required],
      Direccion:[''],
      NIT:[''],
      Telefono:['', Validators.required],
      Correo: ['']
    });

  }

  cargarProveedor(id: string){

    if(id === 'Nuevo'){
      this.loadingService.ocultarLoading();
      return;
    }

  }

  guardarProveedor(){

    if(this.id){
      return;
    }

    console.log('Pendiente crear el servico de guardar proveedor.');

  }

}
