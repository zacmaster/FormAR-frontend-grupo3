import { Iresource } from "./iresource";
import { Area } from "../modelos/area";
import { Horario } from "../modelos/horario";

export interface IInstructor extends Iresource{
    nombre: string,
    apellido: string,
    email: string,
    dni: string,
    telefono: string,
    estudios: string,
    areasPreferencia: Area,
    disponibilidadHoraria: Horario[];
    
}