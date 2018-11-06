import { Resource } from "../componentes/resource";
import { ITarea } from "../interfaces/itarea";
import { Contacto } from "./contacto";
import { Administrativo } from "./administrativo";

export class Tarea extends Resource implements ITarea{
    titulo:string;
	descripcion:string;
	pendiente:boolean;
    fechaEstimada : number;
    contacto: Contacto;
    administrativo: Administrativo;
    
    constructor(){
        super();
        this.titulo="";
        this.descripcion="";
    }
}