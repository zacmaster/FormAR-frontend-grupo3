import { Injectable } from '@angular/core';

import { ISala } from '../interfaces/isala'
import { Sala } from '../modelos/sala';

import { GLOBAL } from './global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { ResourceService } from "./resource.service";


@Injectable({
  providedIn: 'root'
})
export class SalaService extends ResourceService<Sala, ISala>{

  constructor(private _http: HttpClient) {
    super(_http,GLOBAL.url + 'v1/salas','');
   }

  public getSalas(): Observable<ISala[]>{
    return super.list();
  }
  
  addSala(sala: Sala): Observable<Sala>{
    console.log("posteando: ",sala)
    return super.create(sala);
  }
  
  updateSala(sala: Sala){
    return super.update(sala);
  }

  deleteSala(sala: Sala): Observable<{}>{
    return super.delete(sala);
  }

  getSala(id: number): Observable<ISala> {
    return super.read(id);
  }

  save(sala: Sala){
    if(sala.id)
      return this.updateSala(sala)
    else
      return this.addSala(sala)
  }

}
