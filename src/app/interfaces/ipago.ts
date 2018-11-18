import { Iresource } from "./iresource";

export interface IPago extends Iresource{
    idInscripcion: number,
    idPago: number,
    idCuota: number,
    fecha_vencimiento: string,
    fecha_pago: string,
    estado: string,
}
