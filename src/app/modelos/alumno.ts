import { Contacto } from "src/app/modelos/contacto";
import { Resource } from "../componentes/resource";
import { IAlumno } from "../interfaces/ialumno";

export class Alumno extends Resource implements IAlumno{
    nombre: string;
    apellido: string;
    email: string;
    dni: string;
    telefono: string;
    fechaNacimiento: number;
    fechaRegistro: number;
    tipo: string;



	constructor() {
        super();

        this.id = 0;
        this.nombre = "";
		this.apellido = "";
		this.email = "";
		this.dni = "";
		this.telefono = "";
        this.tipo = "";
        this.fechaRegistro = + new Date();
        this.fechaNacimiento = + new Date('2000/01/01'); //Por defecto la fecha de nacimiento es 01/01/2000
	}






}
