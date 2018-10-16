import { Iresource } from "./iresource";
import { Alumno } from '../modelos/alumno';

export interface IContacto extends Iresource {
    fecha: number;
    asunto: string;
    descripcion: string;
    alumno: Alumno;
}
