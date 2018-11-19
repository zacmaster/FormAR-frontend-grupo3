import { Iresource } from "./iresource";
import { Nota } from "../modelos/nota";

export interface IExamen extends Iresource{
	nroExamen:number,
	nombreExamen:string,
	idCursada:number,
	notas : Nota[],
}