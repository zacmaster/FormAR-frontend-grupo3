import { Iresource } from "./iresource";
import { Area } from "../modelos/area";
import { Curso } from "../modelos/curso";
import { Alumno } from "../modelos/alumno";

export interface IContacto extends Iresource{
    fecha: number,
    asunto: string,
    descripcion: string,
    curso: Curso,
    area: Area,
    alumno: Alumno
}
