import { Resource } from "../componentes/resource";
import { ICurso } from "../interfaces/icurso";
import { Area } from "./area";

export class Curso extends Resource implements ICurso{
    nombre: string;
	descripcion: string;
	area: Area;
    temario: string;


	constructor() {
        super();
		this.nombre = "";
		this.descripcion = "";
		this.temario = "";
	}


	public copiar(curso: Curso){
		// console.log("curso a copiar: ",curso);
		
		super.copiar(curso)
	}
}
