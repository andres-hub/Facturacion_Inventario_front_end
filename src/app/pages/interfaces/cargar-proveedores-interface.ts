import { Proveedor } from '../models/proveedor.model';

export interface CargarProveedores{
    total: Number;
    proveedores: Proveedor[];
}