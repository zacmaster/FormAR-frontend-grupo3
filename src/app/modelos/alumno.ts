import { Contacto } from "src/app/modelos/contacto";

export class Alumno {
    id: number;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    dni: string;
    disabled: boolean;
    contacto: Contacto;

    constructor(    name: string,
                    lastname: string,
                    email: string,
                    phone: string,
                    dni: string,
                ){
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.dni = dni;
    }

    //for testing purpose
    setId(id: number){
        this.id = id;
    }

    public setDisabled(): void{
        this.disabled = true;
    }

}



