import { IInscripcion } from "../interfaces/i-inscripcion";
import { Iresource } from "../interfaces/iresource";
import { Resource } from "../componentes/resource";

export class Inscripcion extends Resource implements IInscripcion{
    
    idAlumno: number;
    idCursada: number;

    copiar(iresource: Iresource) {
        throw new Error("Method not implemented.");
    }

}
