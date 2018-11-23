import { Resource } from "../componentes/resource";
import { IAdministrativo } from "../interfaces/iadministrativo";

export class Administrativo extends Resource implements IAdministrativo{
    nombre: string;
    username: string;

    constructor(){
      super();
      this.id = 0
      this.nombre = ""
      this.username = ""
    }
}
