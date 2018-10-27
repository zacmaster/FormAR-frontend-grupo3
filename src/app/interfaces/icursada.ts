import { Iresource } from "./iresource";
import { Curso } from "../modelos/curso";
import { Sala } from "../modelos/sala";
import { Instructor } from "../modelos/instructor";
import { Horario } from "../modelos/horario";

export interface Icursada extends Iresource{

    nombre: string;
    fechaInicio: number;
    fechaFin: number;
    sala: Sala;
    instructor: Instructor;
    cantidadClases: number;
    cupoMinimo: number;
    cupoMaximo: number;
    precioCuota: number;
    matricula: number;
    cantidadCuotas: number;
    diaVencCuota: number;
    curso: Curso;
    horariosCursada: Horario[];
    
}
