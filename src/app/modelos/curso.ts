export class Curso {
    id: number = 0;
    name: string;
    tipo: number = 0;
    temario: string;
    disabled: boolean;


    constructor(name: string,
                tipo: number,
                temario: string){
        this.name = name;
        this.temario = temario;
        this.tipo = tipo;
    }
}
