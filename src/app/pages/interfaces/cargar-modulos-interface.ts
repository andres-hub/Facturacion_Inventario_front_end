import { from } from "rxjs";
import { Modulo } from '../models/modulo.model';

export interface CargarModulos{
    total: number;
    modulos: Modulo[];
}