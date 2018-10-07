export class Curso {
    id: number = 0;
    name: string;
    temario: string;


    constructor(name: string, temario: string){
        this.name = name;
        this.temario = temario;
    }
}
