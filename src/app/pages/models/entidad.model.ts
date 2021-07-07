import { Accion } from './accion.model';

export class Entidad {

    constructor(
        public _id: string,
        public modulo: string,
        public nombre:string,
        public url: string,
        public acciones: Accion[]
    ){}
}