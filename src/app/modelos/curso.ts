import { Resource } from "../componentes/resource";
import { ICurso } from "../interfaces/icurso";
import { Area } from "./area";

export class Curso extends Resource implements ICurso{
    nombre: string;
	descripcion: string;
	area: Area;
    temario: string;


	constructor($nombre: string,$descripcion: string, $temario: string) {
        super();
		this.nombre = $nombre;
		this.descripcion = $descripcion;
		this.temario = $temario;
	}



}
