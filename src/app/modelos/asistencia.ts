import { IAsistencia } from "../interfaces/iasistencia";
import { Resource } from "../componentes/resource";

export class Asistencia  extends Resource implements IAsistencia{
    idAlumno;
    nombreAlumno;
    estado;
    deshabilitado:boolean;

    constructor(){
        super();
    }
}