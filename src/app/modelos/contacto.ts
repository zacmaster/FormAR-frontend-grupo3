import { Resource } from "../componentes/resource";
import { Icontacto } from "../interfaces/icontacto";
import { Curso } from "./curso";
import { Area } from "./area";

export class Contacto extends Resource implements Icontacto{
    fecha: number;
    asunto: string;
    descripcion: string;
    curso: Curso;
    area: Area;

	constructor($asunto: string, $descripcion: string) {
        super();
		this.asunto = $asunto;
		this.descripcion = $descripcion;
	}


}
