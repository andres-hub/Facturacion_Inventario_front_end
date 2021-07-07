export class Gasto {

    constructor(
        public _id:string,
        public nombre:string,
        public tipo: string,
        public numeroCuotas: string,
        public efectivoAnual: string,
        public frecuencia:string,   
        public quincena: string,
        public valor:number
    ){}
}