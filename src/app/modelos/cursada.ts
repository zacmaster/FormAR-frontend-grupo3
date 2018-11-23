import { Icursada } from "../interfaces/icursada";
import { Resource } from "../componentes/resource";
import { Curso } from "./curso";
import { Instructor } from "./instructor";
import { Sala } from "./sala";
import { Horario } from "./horario";
import {Administrativo} from './administrativo';

export class Cursada extends Resource implements Icursada {

    nombre: string;
    fechaInicio: number;
    fechaFin: number;
    fechaInicioString: string;
    fechaFinString: string;
    sala: Sala;
    instructor: Instructor;
    administrativo : Administrativo;
    cantidadClases: number;
    cupoMinimo: number;
    cupoMaximo: number;
    precioCuota: number;
    matricula: number;
    cantidadCuotas: number;
    diaVencCuota: number;
    curso: Curso;
    horariosCursada: Horario[];
    inscriptos:number;
    iniciada:boolean;

    constructor(){
        super();
    }

}
