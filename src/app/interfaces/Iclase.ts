import { Iresource } from "./iresource";
import { HoraClase } from "../modelos/horaClase";

export interface IClase extends Iresource{
    idCursada:number,
    nombreCursada:string,
    ocupacionTentativa: boolean,
    ocupacionDefinitiva: boolean,
    clases: HoraClase[],
}