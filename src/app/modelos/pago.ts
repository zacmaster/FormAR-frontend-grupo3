import { IPago } from "../interfaces/ipago";
import { Resource } from "../componentes/resource";

export class Pago extends Resource implements IPago{
    
    id: number;
    idAlumno: number;
    idCursada: number;
    tipo: string;
    estado: string;
    fecha_vencimiento: number;
    fecha_pago: number;
    nombre_cursada: string;
    monto: number;

    constructor(){
        super();
    }

}