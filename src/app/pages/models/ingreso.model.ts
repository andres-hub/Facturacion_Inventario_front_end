export class Ingreso {

    constructor(
        public _id:string,
        public nombre:string,
        public frecuencia:string,
        public valor:  number,
        public quincena?: string,
    ){}
}