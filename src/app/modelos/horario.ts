import { Resource } from "../componentes/resource";
import { IHorario } from "../interfaces/ihorario";

export class Horario extends Resource implements IHorario{
    dia: string;
    horaInicio:number;
    horaFin:number;

    constructor(){
        super();
        this.dia="";
    }
}