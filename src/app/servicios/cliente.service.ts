import { Injectable } from '@angular/core';

import { ICliente } from '../interfaces/icliente'

import { GLOBAL } from './global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cliente } from '../modelos/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  public clientesUrl: string =  GLOBAL.url + 'clientes';

  constructor(private _http: HttpClient) { }


  getClientes(): Observable<ICliente[]>{
    return this._http.get<ICliente[]>(this.clientesUrl)
  }
  
  addCliente(cliente: Cliente): Observable<Cliente>{
    return this._http.post<Cliente>(this.clientesUrl, cliente, GLOBAL.httpOptions)
      .pipe(catchError(this.handleError))
    }
    
  updateCliente(cliente: Cliente){
    const url =`${this.clientesUrl}/${cliente.id}`;

    return this._http.put<Cliente>(url, cliente, GLOBAL.httpOptions).
      pipe(catchError(this.handleError))

  }

  deleteCliente(id: number): Observable<{}>{
    const url = `${this.clientesUrl}/${id}`;

    return this._http.delete(url, GLOBAL.httpOptions)
      .pipe(catchError(this.handleError))
  }

  getCliente(id: number): Observable<ICliente> {
    return this.getClientes().pipe(
      map(clientes => clientes.find(cliente => cliente.id === id))
    )
  }

  save(cliente: Cliente){
    if(cliente.id)
      return this.updateCliente(cliente)
    else
      this.addCliente(cliente)
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
