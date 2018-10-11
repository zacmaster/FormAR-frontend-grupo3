import { Contacto } from "../modelos/contacto";
import { Iresource } from "./iresource";

export interface IAlumno extends Iresource{
    name: string,
    lastname: string,
    email: string,
    phone: string,
    dni: string,
    contacto: Contacto,
    disabled: boolean
}
