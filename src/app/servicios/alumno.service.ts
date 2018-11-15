import { Injectable } from '@angular/core';

import { IAlumno } from '../interfaces/ialumno'
import { Alumno } from '../modelos/alumno';

import { GLOBAL } from './global';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { ResourceService } from "./resource.service";


@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends ResourceService<Alumno, IAlumno>{

  constructor(private _http: HttpClient) {
    super(_http,GLOBAL.url + 'alumnos','');
   }


  public getAlumnos(): Observable<IAlumno[]>{
    return super.list();
  }
  
  addAlumno(alumno: Alumno): Observable<Alumno>{
    console.log("posteando: ",alumno)
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
  getAnalitico(id: number){
    let url = GLOBAL.url + 'alumnos/analitico/' + id;
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this._http.get(url, { headers: headers, responseType: 'blob' });
   
  }

  save(alumno: Alumno){
    if(alumno.id)
      return this.updateAlumno(alumno)
    else
      return this.addAlumno(alumno)
  }









  
}
