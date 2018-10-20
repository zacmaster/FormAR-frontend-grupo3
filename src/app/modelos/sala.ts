import { Resource } from "../componentes/resource";
import { ISala } from "../interfaces/isala";
export class Sala extends Resource implements ISala{
    nombre:string;
    capacidad:number;
    ocupado:boolean;

    constructor(){
        super();
        this.nombre="";
    }
}
    