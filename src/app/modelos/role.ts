import { Resource } from "../componentes/resource";
import {IRole} from '../interfaces/irole';

export class Role  extends Resource implements IRole{
  nombre: string;

  constructor(nombre: string){
    super();
    this.nombre = nombre;
  }
  public copiar(role: Role){
    super.copiar(role);
  }
}
