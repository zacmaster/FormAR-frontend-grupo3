import { Iresource } from "./iresource";

export interface IPago extends Iresource{

    id: number;
    idAlumno: number;
    idCursada: number;
    tipo: string;
    estado: string;
    fecha_vencimiento: number;
    fecha_pago: number;
    nombre_cursada: string;
    monto: number;
}
