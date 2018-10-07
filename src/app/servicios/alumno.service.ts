import { Injectable } from '@angular/core';

import { IAlumno } from '../interfaces/ialumno'

import { GLOBAL } from './global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Alumno } from '../modelos/alumno';


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  public alumnosUrl: string =  GLOBAL.url + 'alumnos';setDisabled

  constructor(private _http: HttpClient) { }


  getAlumnos(): Observable<IAlumno[]>{
    return this._http.get<IAlumno[]>(this.alumnosUrl);
  }
  
  addAlumno(alumno: Alumno): Observable<Alumno>{
    alumno.disabled = false;
    return this._http.post<Alumno>(this.alumnosUrl, alumno, GLOBAL.httpOptions)
      .pipe(catchError(this.handleError))
    }
    
  updateAlumno(alumno: Alumno){
    const url =`${this.alumnosUrl}/${alumno.id}`;

    return this._http.put<Alumno>(url, alumno, GLOBAL.httpOptions).
      pipe(catchError(this.handleError))

  }

  deleteAlumno(alumno: Alumno): Observable<{}>{
    alumno.disabled = true;
    const url = `${this.alumnosUrl}/${alumno.id}`;

    return this._http.put<Alumno>(url, alumno, GLOBAL.httpOptions)
      .pipe(catchError(this.handleError))
  }

  getAlumno(id: number): Observable<IAlumno> {
    return this.getAlumnos().pipe(
      map(alumnos => alumnos.find(alumno => alumno.id === id))
    )
  }

  save(alumno: Alumno){
    if(alumno.id)
      return this.updateAlumno(alumno)
    else
      this.addAlumno(alumno)
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
