import { Usuario } from '../../auth/models/usuario.model';

export interface CargarUsuarios{
    total: number;
    usuarios: Usuario[];
}