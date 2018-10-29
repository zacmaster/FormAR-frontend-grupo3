import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Inscripcion } from '../modelos/inscripcion';
import { IInscripcion } from '../interfaces/i-inscripcion';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { Cursada } from '../modelos/cursada';
import { CursadaService } from './cursada.service';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService extends ResourceService<Inscripcion,IInscripcion>{
  
  constructor(
                private _http: HttpClient,
                private _cursadaService: CursadaService
            ) {
    super(_http, GLOBAL.url + 'inscripciones','');
  }

  addInscripcion(inscripcion: Inscripcion): Observable<Inscripcion>{
    return super.create(inscripcion);
  }
  // http://localhost:3000/v1/inscripciones/alumnos/1

  getCursadasDeAlumno(alumnoId: number){
    let url = GLOBAL.url + 'inscripciones/alumnos/' + alumnoId;
    return this._cursadaService.listURL(url);
  }
}
