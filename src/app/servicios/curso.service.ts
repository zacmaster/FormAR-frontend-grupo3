import { Injectable } from '@angular/core';

import { ICurso } from '../interfaces/icurso'
import { GLOBAL } from './global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Curso } from '../modelos/curso';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends ResourceService<Curso, ICurso>{

  constructor(private _http: HttpClient) {
    super(_http, GLOBAL.url + 'cursos','');
  }

  getCursos(): Observable<ICurso[]>{
    return super.list();
  }


  addCurso(curso: Curso): Observable<Curso>{
    return super.create(curso);
  }
    
  updateCurso(curso: Curso){
    return super.update(curso);
  }

  deleteCurso(curso: Curso): Observable<{}>{
    return super.delete(curso);
  }

  getCurso(id: number): Observable<ICurso> {
    return super.read(id);
  }

  save(curso: Curso){
    if(curso.id)
      return this.updateCurso(curso)
    else
      this.addCurso(curso)
  }



}
