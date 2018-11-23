import { Iresource } from "./iresource";
import { Nota } from "../modelos/nota";

export interface IExamen extends Iresource{
	nroExamen:number,
	nombreExamen:string,
	fecha:number,
	idCursada:number,
	notas : Nota[],
}