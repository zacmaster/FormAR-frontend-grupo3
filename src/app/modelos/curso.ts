import { Resource } from "../componentes/resource";
import { ICurso } from "../interfaces/icurso";

export class Curso extends Resource implements ICurso{
    nombre: string;
    temario: string;
    idArea: number;


	constructor($nombre: string,$temario: string, $idArea: number) {
        super();
		this.temario = $temario;
		this.nombre = $nombre;
		this.idArea = $idArea;
	}



}
