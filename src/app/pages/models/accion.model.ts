export class Accion {

    constructor(
        public accion: string,
        public alias: string,
        public url: string,
        public check?: string,
        public _id?: string
    ){}
}