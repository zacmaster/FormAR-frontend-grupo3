import { IArea } from "../interfaces/iarea";
import { Resource } from "../componentes/resource";

export class Area  extends Resource implements IArea{
    nombre: string;

    constructor(nombre: string){
        super();
        this.nombre = nombre;
        this.id = 0;
    }
    public copiar(area: Area){
        super.copiar(area);
    }


}
