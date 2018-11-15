import { Iresource } from "./iresource";
import { Contacto } from "../modelos/contacto";
import { Administrativo } from "../modelos/administrativo";

export interface ITarea extends Iresource{
    titulo:string,
	descripcion:string,
	pendiente:boolean,
    fechaEstimada : number,
    contacto: Contacto,
    administrativo: Administrativo,
}