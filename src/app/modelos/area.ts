import { IArea } from "../interfaces/iarea";
import { Resource } from "../componentes/resource";

export class Area  extends Resource implements IArea{
    nombre: string;

    constructor(){
        super();
        this.nombre = "";
    }
    public copiar(area: Area){
        super.copiar(area);
    }


}
