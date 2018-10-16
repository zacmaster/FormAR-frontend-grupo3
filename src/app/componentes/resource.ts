import { Iresource } from "../interfaces/iresource";

export class Resource implements Iresource{
    id: number = 0;
    
    public copiar(resource: Resource): void{
        if(resource != null && resource != undefined){
            for(let atributo in resource){
                this[atributo] = resource[atributo];
            }
        }
        else
            self = undefined;
    }
        
    
}