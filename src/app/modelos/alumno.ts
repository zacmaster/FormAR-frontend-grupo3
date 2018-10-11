import { Contacto } from "src/app/modelos/contacto";
import { Resource } from "../componentes/resource";

export class Alumno extends Resource{
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
        super()
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



