import { Resource } from "../componentes/resource";
import { ICurso } from "../interfaces/icurso";

export class Curso extends Resource implements ICurso{
    temario: string;
    nombre: string;
    idArea: string;


	constructor($temario: string, $nombre: string, $idArea: string) {
        super();
		this.temario = $temario;
		this.nombre = $nombre;
		this.idArea = $idArea;
	}



}
