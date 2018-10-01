export class Cliente {
    id: number;
    name: string;
    lastname: string;
    email: string;
    phone: string;

    constructor(name: string, lastname: string, email: string, phone: string){
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
    }
    //for testing purpose
    setId(id: number){
        this.id = id;
    }
}



