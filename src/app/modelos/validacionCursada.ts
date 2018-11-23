import { Resource } from "../componentes/resource";
import { IValidacionCursada } from "../interfaces/i-validacionCursada";
export class ValidacionCursada extends Resource implements IValidacionCursada{
    estadoInstructor:string;
    estadoSala:string;

    constructor(){
        super();
        this.estadoInstructor="";
        this.estadoSala="";
    }
}
    