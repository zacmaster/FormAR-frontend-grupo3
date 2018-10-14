import { Iresource } from "./iresource";
import { Curso } from "../modelos/curso";

export interface Icursada extends Iresource{
    fechaInicio: number,
    precioClase: number,
    cantidadClases: number,
    cupoMaximo: number,
    cupoMinimo: number,
    horarios: any,
    curso: Curso,
    instructor: any,
    sala: any
    

}
