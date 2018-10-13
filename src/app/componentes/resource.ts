export class Resource {
    id: number;
    
    public copiar(resource: Resource): void{
        for(let atributo in resource){
            this[atributo] = resource[atributo];
        }
    }
        
    
}