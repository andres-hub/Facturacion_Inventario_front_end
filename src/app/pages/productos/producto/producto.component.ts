import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { LoadingService } from '../../../components/services/loading.service';
import { ProductosService } from '../../services/productos.service';
import { ProveedoresService } from '../../services/proveedores.service';

import { Proveedor } from '../../models/proveedor.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  public productoFrom: FormGroup;
  private id: string;
  public proveedoresProducto: Proveedor[] = [];
  public proveedores: Proveedor[];

  constructor(
    private activatedRoute:ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private loadingService: LoadingService, 
    private productosService:ProductosService,
    private proveedoresService: ProveedoresService
  ) { }

  ngOnInit(): void {

    this.cargarProveedores();
    this.activatedRoute.params.subscribe(({id})=> this.cargarProducto(id));


    this.productoFrom = this.fb.group({
      Nombre: ['', Validators.required],
      Codigo: ['',Validators.required],
      UnidadMedida: ['', Validators.required],
      ValorInterno: ['',Validators.required],
      ValorPublico: ['',Validators.required],
      ValorMayorista:[''],
      StockMinimo: [''],
      Proveedor: ['']
    });

  }

  cargarProducto(id: string){

    if( id === 'Nuevo'){
      this.loadingService.ocultarLoading();
      return;
    }

    this.productosService.cargarProducto(id).pipe(
      delay(100)
    ).subscribe((producto) =>{
      
      if(!producto){
        return this.location.back();
      }
      
      this.proveedoresProducto = producto.Proveedores;
      this.id = id;

      const { Nombre, Codigo, UnidadMedida, ValorInterno, ValorPublico, StockMinimo, ValorMayorista } = producto;

      this.productoFrom.setValue({ Nombre, Codigo, UnidadMedida, ValorInterno, ValorPublico, StockMinimo: StockMinimo || '', ValorMayorista: ValorMayorista || '', Proveedor: '' });
      this.loadingService.ocultarLoading();      

    }, (err)=>{
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return this.location.back();
    });

  }

  cargarProveedores(){

    this.proveedoresService.cargarProveedores().subscribe(({total, proveedores})=>{
      this.proveedores = proveedores;
      this.loadingService.ocultarLoading();
    },(err)=>{
      Swal.fire({
        title: '¡Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return this.location.back();
    });

  }

  guardarProducto(){
    
    if(this.proveedoresProducto.length == 0){      
      Swal.fire({
        title: '¡Error!',
        text: 'Por agregué un proveedor.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    this.loadingService.mostrarLoading();

    if(this.id){

      const data = { ...this.productoFrom.value, Proveedores: this.proveedoresProducto, _id: this.id };

      this.productosService.actualizarProducto(data).subscribe((resp:any)=>{

        this.loadingService.ocultarLoading();

        Swal.fire({
          title: 'Actualización exitosa',
          text: `${resp.producto.Nombre}.`,
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
      });

      return;
    }

    const data = { ...this.productoFrom.value, Proveedores: this.proveedoresProducto };

    this.productosService.crearProducto(data).subscribe((resp:any)=>{

      this.loadingService.ocultarLoading();

      Swal.fire({
        title: 'Creado con éxito.',
        text: `${resp.producto.Nombre}.`,
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

  eliminarProveedor(proveedor: Proveedor){

    const i = this.proveedoresProducto.indexOf(proveedor)
    this.proveedoresProducto.splice(i,1);
    return;
  }

  agregarProveedor(){

    const proveedor = this.productoFrom.value.Proveedor

    if(!proveedor)
      return;

    const proveedorProducto = this.proveedoresProducto.filter(x=>  x._id == proveedor)[0];
    if(proveedorProducto){
      return;
    }

    const proveedorDB = this.proveedores.filter(x=> x._id == proveedor)[0];
    
    this.proveedoresProducto.push(proveedorDB);
    return;

  }


}
