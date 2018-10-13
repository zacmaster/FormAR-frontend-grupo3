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



	constructor($nombre: string, $apellido: string, $email: string, $dni: string, $telefono: string, $tipo: string) {
        super();

        this.id = 0;
        this.nombre = $nombre;
		this.apellido = $apellido;
		this.email = $email;
		this.dni = $dni;
		this.telefono = $telefono;
		this.tipo = $tipo;
	}



    


}



