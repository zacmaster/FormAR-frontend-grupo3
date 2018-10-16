import { Resource } from "../componentes/resource";
import { IContacto } from "../interfaces/icontacto";
import { Curso } from "./curso";
import { Area } from "./area";

export class Contacto extends Resource implements IContacto{
    fecha: number;
    asunto: string;
    descripcion: string;
    curso: Curso;
    area: Area;

    constructor(){
        super();
    }


}
