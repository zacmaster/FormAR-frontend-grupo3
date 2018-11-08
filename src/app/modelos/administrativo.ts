import { Resource } from "../componentes/resource";
import { IAdministrativo } from "../interfaces/iadministrativo";

export class Administrativo extends Resource implements IAdministrativo{
    label: string;
    
    constructor(){
        super();
    }
}