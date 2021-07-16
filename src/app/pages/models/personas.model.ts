export class Persona{

    constructor(
        public _id: string,
        public PrimerNombre: string,
        public SegundoNombre: string,
        public PrimerApellido: string,
        public SgundoApellido: string,
        public Telefonos: string[],
        public Correos: string[]
    ){}

}