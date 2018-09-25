export class Usuario {
    id: number = 0;
    name: string;
    email: string;
    password: string;

    constructor(name: string, email: string, pass: string, ){
        this.name = name;
        this.email = email;
        this.password = pass;
    }
}
