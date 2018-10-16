import { Injectable } from '@angular/core';

import { IContacto } from '../interfaces/icontacto'
import { Contacto } from '../modelos/contacto';

import { GLOBAL } from './global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { ResourceService } from "./resource.service";


@Injectable({
  providedIn: 'root'
})
export class ContactoService extends ResourceService<Contacto, IContacto>{


  constructor(private _http: HttpClient) {
    super(_http,GLOBAL.url + 'contactos','');
   }


  public getContactos(): Observable<IContacto[]>{
    return super.list();
  }

  addContacto(contacto: Contacto): Observable<Contacto>{
    return super.create(contacto);
  }

  updateContacto(contacto: Contacto){
    return super.update(contacto);
  }

  deleteContacto(contacto: Contacto): Observable<{}>{
    return super.delete(contacto);
  }

  getContacto(id: number): Observable<IContacto> {
    return super.read(id);
  }

  save(contacto: Contacto){
    if(contacto.id)
      return this.updateContacto(contacto)
    else
      return this.addContacto(contacto)
  }
}
