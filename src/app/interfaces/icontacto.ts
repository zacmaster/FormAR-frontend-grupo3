import { Iresource } from "./iresource";

export interface IContacto extends Iresource {
    fecha: number;
    asunto: string;
    descripcion: string;
}
