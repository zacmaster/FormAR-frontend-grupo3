import { Iresource } from "./iresource";
import { Area } from "../modelos/area";

export interface ICurso extends Iresource {
    nombre: string,
    descripcion: string,
    temario: string,
    area: Area
}
