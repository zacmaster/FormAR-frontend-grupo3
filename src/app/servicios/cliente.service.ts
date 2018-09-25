import { Injectable } from '@angular/core';

import { ICliente } from '../interfaces/icliente'

import { GLOBAL } from './global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  public _urlClientes: string =  GLOBAL.url + 'clientes';

  constructor(private _http: HttpClient) { }


  getClientes(): Observable<ICliente[]>{
    return this._http.get<ICliente[]>(this._urlClientes)
  }

  
}
