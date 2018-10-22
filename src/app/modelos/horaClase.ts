import { Resource } from "../componentes/resource";
import { IHoraClase } from "../interfaces/ihoraClase";

export class HoraClase extends Resource implements IHoraClase{
    fecha:number;
    horaInicio:number;
    horaFin:number;

    constructor(){
        super();
       
    }
}