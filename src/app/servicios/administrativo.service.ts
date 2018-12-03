import { Injectable } from '@angular/core';

import { IAlumno } from '../interfaces/ialumno'
import { Alumno } from '../modelos/alumno';

import { GLOBAL } from './global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { ResourceService } from "./resource.service";
import { Administrativo } from '../modelos/administrativo';
import { IAdministrativo } from '../interfaces/iadministrativo';


@Injectable({
  providedIn: 'root'
})
export class AdministrativoService extends ResourceService<Administrativo, IAdministrativo>{

  constructor(private _http: HttpClient) {
    super(_http,GLOBAL.url + 'v1/tareas/administrativos','');
   }

   public getAdministrativos(): Observable<IAdministrativo[]>{
    return super.list();
  }

  public addAdministrativo(administrativo: Administrativo): Observable<Administrativo>{
    console.log("posteando: ",administrativo)
    return super.create(administrativo);
  }

  public getAdministrativoByUsername(username: string) : Observable<IAdministrativo[]>{
    return super.readByUsername(username);
  }
}
