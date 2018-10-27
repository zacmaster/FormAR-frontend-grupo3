import { Resource } from "../componentes/resource";
import { IClase } from "../interfaces/Iclase";

export class Clase extends Resource implements IClase{
    idCursada;
    nombreCursada;
    ocupacionTentativa;
    ocupacionDefinitiva;
    clases;

    constructor(){
        super();
        this.nombreCursada="";
    }
}