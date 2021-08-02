import { Proveedor } from './proveedor.model';


export class Producto {

    constructor(
        public _id: string,
        public Estado: boolean,
        public Proveedores: Proveedor[],
        public Nombre: string,
        public Codigo: string,
        public UnidadMedida: string,
        public ValorInterno: Number,
        public ValorPublico: Number,
        public Empresa: string,
        public ValorMayorista: Number,
        public StockMinimo: Number
    ){}

}