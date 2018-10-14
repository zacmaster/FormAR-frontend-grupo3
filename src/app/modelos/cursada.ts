import { Icursada } from "../interfaces/icursada";
import { Resource } from "../componentes/resource";
import { Curso } from "./curso";

export class Cursada extends Resource implements Icursada {
    fechaInicio: number;
    precioClase: number;
    cantidadClases: number;
    cupoMaximo: number;
    cupoMinimo: number;
    horarios: any;
    curso: Curso;
    instructor: any;
    sala: any;

    constructor(){
        super();
    }

}
