import { IArea } from "../interfaces/iarea";

export class Area implements IArea{
    id: number;
    nombre: string;
    deshabilitado: boolean;

    constructor(nombre: string){
        this.nombre = nombre;
    }

}
