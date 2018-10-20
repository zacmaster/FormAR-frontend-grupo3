import { Iresource } from "./iresource";

export interface ISala extends Iresource{
    
    nombre:string,
    capacidad:number,
    ocupado:boolean,

}