import { Injectable } from '@angular/core';

import { IAlumno } from '../interfaces/ialumno'
import { Alumno } from '../modelos/alumno';

import { GLOBAL } from './global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResourceService } from "./resource.service";


@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends ResourceService<Alumno, IAlumno>{

  constructor(private _http: HttpClient) {
    super(_http,GLOBAL.url + 'alumno','');
   }


  public getAlumnos(): Observable<IAlumno[]>{
    return super.list();
  }
  
  addAlumno(alumno: Alumno): Observable<Alumno>{
    console.log("posteando alumno: ",alumno);
    
    return super.create(alumno);
  }
  
  updateAlumno(alumno: Alumno){
    return super.update(alumno);
  }

  deleteAlumno(alumno: Alumno): Observable<{}>{
    return super.delete(alumno);
  }

  getAlumno(id: number): Observable<IAlumno> {
    return super.read(id);
  }

  save(alumno: Alumno){
    if(alumno.id)
      return this.updateAlumno(alumno)
    else
      return this.addAlumno(alumno)
  }









  
}
