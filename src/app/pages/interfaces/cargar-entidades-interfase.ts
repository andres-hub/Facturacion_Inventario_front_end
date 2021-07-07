import { Entidad } from '../models/entidad.model';

export interface CargarEntidades{
    total: number;
    entidades: Entidad[];
}