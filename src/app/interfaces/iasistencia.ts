import { Iresource } from "./iresource";


export interface IAsistencia extends Iresource{
    idAlumno:number,
    nombreAlumno:string,
    estado:string,  
}