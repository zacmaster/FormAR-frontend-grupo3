import { Resource } from "../componentes/resource";
import { INota } from "../interfaces/inota";

export class Nota extends Resource implements INota{
	nota:any;
	ausente:boolean;
    idAlumno:number;
    nombreAlumno:string;
    deshabilitado:boolean;
    
    constructor(){
        super();
       
    }
}