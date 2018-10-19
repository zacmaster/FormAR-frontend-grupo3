import { Iresource } from "./iresource";

export interface IHorario extends Iresource{
    dia: string,
    horaInicio:number,
    horaFin:number
}