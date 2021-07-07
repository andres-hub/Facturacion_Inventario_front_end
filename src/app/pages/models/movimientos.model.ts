export class Movimiento {

    constructor(
        public _id: string,
        public nombre: string,
        public pago: boolean,
        public tipo: string,
        public arquetipoId: string,
        public valor: number,
        public fecha: string
    ){}
}