import { Resource } from "../componentes/resource";
import { INota } from "../interfaces/inota";

export class Nota extends Resource implements INota{
	nota:number;
	ausente:boolean;
    idAlumno:number;
    
    constructor(){
        super();
       
    }
}