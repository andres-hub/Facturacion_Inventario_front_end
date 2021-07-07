import { Modulo } from './modulo.model';
import { Entidad } from './entidad.model';


export class Menu {

    constructor(
        public modulo:Modulo,
        public entidades: Entidad[]
    ){}
}