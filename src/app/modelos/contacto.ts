import { Resource } from "../componentes/resource";
import { IContacto } from "../interfaces/icontacto";
import { Curso } from "./curso";
import { Area } from "./area";
import { Alumno } from "./alumno";

export class Contacto extends Resource implements IContacto{
    fecha: number;
    asunto: string;
    descripcion: string;
    curso: Curso;
    area: Area;
    alumno: Alumno;

    constructor(){
        super();
        this.fecha = + new Date();
        this.asunto = '';
        this.descripcion = '';
        this.area = new Area();
        this.curso = new Curso();
        this.alumno = new Alumno();
    }


}
