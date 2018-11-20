import { Resource } from "../componentes/resource";

export interface IRole extends Resource{
  nombre: string;

  copiar(irole: IRole);

}
