import { Resource } from "../componentes/resource";
import { IContacto } from "../interfaces/icontacto";
import { Alumno } from '../modelos/alumno';

export class Contacto extends Resource implements IContacto{
    fecha: number;
    asunto: string;
    descripcion: string;
    alumno: Alumno;

    constructor(){
        super();
    }


}
