import { Resource } from "../componentes/resource";
import { IContacto } from "../interfaces/icontacto";

export class Contacto extends Resource implements IContacto{
    fecha: number;
    asunto: string;
    descripcion: string;

    constructor(){
        super();
    }


}
