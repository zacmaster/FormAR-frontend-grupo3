import { Contacto } from "../modelos/contacto";

export interface IAlumno {
    id: number,
    name: string,
    lastname: string,
    email: string,
    phone: string,
    dni: string,
    contacto: Contacto,
    disabled: boolean
}
