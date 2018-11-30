import { Contacto } from "../modelos/contacto";
import { Iresource } from "./iresource";

export interface IAlumno extends Iresource{
    nombre: string,
    apellido: string,
    email: string,
    dni: string,
    telefono: string,
    fechaNacimiento: number,
    fechaRegistro: number,
    activo: boolean,
    nombreApellido:string 
    
}
