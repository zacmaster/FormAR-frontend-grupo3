import { IInstructor } from "../interfaces/iinstructor";
import { Resource } from "../componentes/resource";
import { Area } from "../modelos/area";
import { Horario } from "../modelos/horario";

export class Instructor extends Resource implements IInstructor{
    nombre: string;
    apellido: string;
    email: string;
    dni: string;
    telefono: string;
    estudios: string;
    areasPreferencia: Area[];
    disponibilidadHoraria: Horario[];
    username: string;
    password: string;

    constructor(){
        super();
        this.id = 0;
        this.nombre = "";
		this.apellido = "";
		this.email = "";
		this.dni = "";
        this.telefono = "";
        this.estudios = "";
        this.username = "";
        this.password = "";
    }
}
