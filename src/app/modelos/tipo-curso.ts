export class TipoCurso {
    id: number;
    name: string;
    disabled: boolean;

    constructor(name: string){
        this.name = name;
    }


    public setDisabled(): void{
        this.disabled = true;
    }
}
