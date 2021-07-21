import { Persona } from "./persona.model";

export class Proveedor {

    constructor(
        public _id:string,
        public Nombre: string,
        public NIT: string,
        public Direccion: string,
        public Telefono: string,
        public Correo: string,
        public PersonaContacto: Persona[],
        public Estado: boolean,
        public Empresa: string
    ){}

}