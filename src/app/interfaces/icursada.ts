import { Iresource } from "./iresource";
import { Curso } from "../modelos/curso";

export interface Icursada extends Iresource{

    fechaInicio: number;
    fechaFin: number;
    turno: string;
    horario: string;
    dias: string[];
    instructor: any;
    sala: any;
    precioClase: number;
    matricula: number;
    cantidadClases: number;
    cupoMinimo: number;
    cupoMaximo: number;
    curso: Curso;
    
}
