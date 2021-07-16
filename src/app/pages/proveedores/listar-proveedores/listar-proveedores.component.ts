import { Component, OnInit } from '@angular/core';

import { Proveedor } from '../../models/proveedor.model';
import { LoadingService } from '../../../components/services/loading.service';
@Component({
  selector: 'app-listar-proveedores',
  templateUrl: './listar-proveedores.component.html',
  styleUrls: ['./listar-proveedores.component.css']
})
export class ListarProveedoresComponent implements OnInit {

  public desde: number = 0;
  public totalRegistros: Number = 0;
  public mostrandoDesde: Number = 0;
  public mostrandoHasta: Number = 0;
  public proveedores: Proveedor[];

  

  constructor(
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores(){
    this.loadingService.ocultarLoading();
  }

}
