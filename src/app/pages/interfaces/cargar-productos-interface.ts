import { Producto } from '../models/producto.model';

export interface CargarProductos{
    total: Number;
    productos: Producto[];
}