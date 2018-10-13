import { Iresource } from "../interfaces/iresource";

export class Resource implements Iresource{
    id: number;
    
    public copiar(resource: Resource): void{
        for(let atributo in resource){
            this[atributo] = resource[atributo];
        }
    }
        
    
}