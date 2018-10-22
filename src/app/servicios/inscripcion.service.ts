import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Inscripcion } from '../modelos/inscripcion';
import { IInscripcion } from '../interfaces/i-inscripcion';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService extends ResourceService<Inscripcion,IInscripcion>{

  constructor(private _http: HttpClient) {
    super(_http, GLOBAL.url + 'inscripciones','');
  }

  addInscripcion(inscripcion: Inscripcion): Observable<Inscripcion>{
    return super.create(inscripcion);
  }
  prueba(obj){
    return super.create(obj);
  }
}
