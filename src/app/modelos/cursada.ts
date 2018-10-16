import { Icursada } from "../interfaces/icursada";
import { Resource } from "../componentes/resource";
import { Curso } from "./curso";

export class Cursada extends Resource implements Icursada {
 
    fechaInicio: number;
    fechaFin: number;
    turno: string;
    horario: string;
    dias: any;
    instructor: any;
    sala: any;
    precioClase: number;
    matricula: number;
    cantidadClases: number;
    cupoMinimo: number;
    cupoMaximo: number;
    curso: Curso;

    // precioClase: number;
    // cantidadClases: number;
    // cupoMaximo: number;
    // cupoMinimo: number;
    // horarios: any;
    // curso: Curso;
    // instructor: any;
    // sala: any;

    constructor(){
        super();
    }

}
