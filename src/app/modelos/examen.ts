import { Resource } from "../componentes/resource";
import { IExamen } from "../interfaces/iexamen";
import { Nota } from "../modelos/nota";

export class Examen extends Resource implements IExamen{
    nroExamen:number;
	idCursada:number;
	notas : Nota[];

    constructor(){
        super();
       
    }
}