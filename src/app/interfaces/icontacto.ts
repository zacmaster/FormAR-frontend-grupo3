import { Iresource } from "./iresource";
import { Area } from "../modelos/area";
import { Curso } from "../modelos/curso";

export interface Icontacto extends Iresource{
    fecha: number,
    asunto: string,
    descripcion: string,
    curso: Curso,
    area: Area
}
