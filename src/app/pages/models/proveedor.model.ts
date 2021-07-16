import { Persona } from "./personas.model";

export class Proveedor {

    constructor(
        public _id:string,
        public Nombre: string,
        public NIT: string,
        public Direccion: string,
        public Telefono: string,
        public correo: string,
        public PersonaContacto: Persona[],
        public Estado: boolean
    ){}

}