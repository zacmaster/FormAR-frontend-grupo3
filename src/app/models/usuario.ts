export class Usuario {
    id: number = 0;
    name: string;
    email: string;
    password: string;

    constructor(email: string, pass: string, ){
        this.email = email;
        this.password = pass;
    }
}
