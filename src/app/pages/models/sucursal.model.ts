import { Empresa } from './empresa.model';
export class Sucursal{
    constructor(
        public _id: string,
        public Empresa: string,
        public Nombre: string,
        public Direccion: string,
        public Telefono: string,
        public Estado: boolean
    ){}
}