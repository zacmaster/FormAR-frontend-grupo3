import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Inscripcion } from '../modelos/inscripcion';
import { IInscripcion } from '../interfaces/i-inscripcion';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { Cursada } from '../modelos/cursada';
import { CursadaService } from './cursada.service';
import { AlumnoService } from './alumno.service';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService extends ResourceService<Inscripcion,IInscripcion>{
  
  constructor(
                private _http: HttpClient,
                private _cursadaService: CursadaService,
                private _alumnoService: AlumnoService
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

  getAlumnosCursada(cursadaId: number){
    let url = GLOBAL.url + 'inscripciones/cursadas/' + cursadaId;
    return this._alumnoService.listURL(url);
  }
  getInscCursada(cursadaId: number){
    let url = GLOBAL.url + 'inscripciones/cursadaInsc/' + cursadaId;
    return super.listURL(url);
  }
  deleteInscripcion(inscripcion: Inscripcion): Observable<{}>{
    return super.delete(inscripcion)
  }
  getInscripcion(alumnoId: number,cursadaId: number){
    let url = GLOBAL.url + 'inscripciones/alumno/' + alumnoId+'/cursada/'+cursadaId;
    return super.listURLOne(url);
  }
}
