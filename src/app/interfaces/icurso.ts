import { Iresource } from "./iresource";

export interface ICurso extends Iresource {
    nombre: string,
    temario: string,
    idArea: string,
}
