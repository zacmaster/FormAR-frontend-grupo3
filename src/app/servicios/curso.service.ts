import { Injectable } from '@angular/core';

import { ICurso } from '../interfaces/icurso'
import { GLOBAL } from './global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Curso } from '../modelos/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  public cursosURL: string = GLOBAL.url + 'cursos';

  constructor(private _http: HttpClient) { }

  getCursos(): Observable<ICurso[]>{
    return this._http.get<ICurso[]>(this.cursosURL)
  }


  addCurso(curso: Curso): Observable<Curso>{
    return this._http.post<Curso>(this.cursosURL, curso, GLOBAL.httpOptions)
      .pipe(catchError(this.handleError))
    }
    
  updateCurso(curso: Curso){
    const url =`${this.cursosURL}/${curso.id}`;

    return this._http.put<Curso>(url, curso, GLOBAL.httpOptions).
      pipe(catchError(this.handleError))

  }

  deleteCurso(id: number): Observable<{}>{
    const url = `${this.cursosURL}/${id}`;

    return this._http.delete(url, GLOBAL.httpOptions)
      .pipe(catchError(this.handleError))
  }

  getCurso(id: number): Observable<ICurso> {
    return this.getCursos().pipe(
      map(cursos => cursos.find(curso => curso.id === id))
    )
  }

  save(curso: Curso){
    if(curso.id)
      return this.updateCurso(curso)
    else
      this.addCurso(curso)
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


}
