import { Resource } from "../componentes/resource";
import { IClaseCursada } from "../interfaces/iclasecursada";
import { Asistencia } from "../modelos/asistencia";

export class ClaseCursada extends Resource implements IClaseCursada{
    fecha:number;
    idCursada:number;
    asistencias:Asistencia[];

    constructor(){
        super();
       
    }
}