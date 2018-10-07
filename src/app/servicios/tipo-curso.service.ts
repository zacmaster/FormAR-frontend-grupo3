import { Injectable } from '@angular/core';

import { ITipoCurso } from '../interfaces/itipo-curso';
import { TipoCurso } from '../modelos/tipo-curso';

import { GLOBAL } from './global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TipoCursoService {
  public tipoCursosUrl: string = GLOBAL.url + 'tipoCursos';

  constructor(private _http: HttpClient) { }

  public getTipoCursos(): Observable<ITipoCurso[]>{
    return this._http.get<ITipoCurso[]>(this.tipoCursosUrl);
  }

  addTipoCurso(tipoCurso: TipoCurso): Observable<TipoCurso>{
    tipoCurso.disabled = false;
    return this._http.post<TipoCurso>(this.tipoCursosUrl, tipoCurso, GLOBAL.httpOptions)
      .pipe(catchError(this.handleError))
  }

  updateTipoCurso(tipoCurso: TipoCurso){
    const url =`${this.tipoCursosUrl}/${tipoCurso.id}`;

    return this._http.put<TipoCurso>(url, tipoCurso, GLOBAL.httpOptions).
      pipe(catchError(this.handleError))

  }


  deleteTipoCurso(tipoCurso: TipoCurso): Observable<{}>{
    tipoCurso.disabled = true;
    const url = `${this.tipoCursosUrl}/${tipoCurso.id}`;

    return this._http.put<TipoCurso>(url, tipoCurso, GLOBAL.httpOptions)
      .pipe(catchError(this.handleError))
  }

  getTipoCurso(id: number): Observable<ITipoCurso> {
    return this.getTipoCursos().pipe(
      map(tipoCursos => tipoCursos.find(tipoCurso => tipoCurso.id === id))
    )
  }


  save(tipoCurso: TipoCurso){
    if(tipoCurso.id)
      return this.updateTipoCurso(tipoCurso)
    else
      this.addTipoCurso(tipoCurso)
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
