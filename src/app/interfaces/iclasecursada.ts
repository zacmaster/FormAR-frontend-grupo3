
import { Iresource } from "./iresource";
import { Asistencia } from "../modelos/asistencia";

export interface IClaseCursada extends Iresource{
    fecha:number;
    idCursada:number;
    asistencias:Asistencia[];
}
