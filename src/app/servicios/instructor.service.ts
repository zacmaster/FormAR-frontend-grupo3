import { Injectable } from '@angular/core';

import { IInstructor } from '../interfaces/iinstructor'
import { Instructor } from '../modelos/instructor';

import { GLOBAL } from './global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { ResourceService } from "./resource.service";


@Injectable({
  providedIn: 'root'
})
export class InstructorService extends ResourceService<Instructor, IInstructor>{

  constructor(private _http: HttpClient) {
    super(_http,GLOBAL.url + 'instructores','');
   }

  public getInstructores(): Observable<IInstructor[]>{
    return super.list();
  }
  
  addInstructor(instructor: Instructor): Observable<Instructor>{
    console.log("posteando: ",instructor)
    return super.create(instructor);
  }
  
  updateInstructor(instructor: Instructor){
    return super.update(instructor);
  }

  deleteInstructor(instructor: Instructor): Observable<{}>{
    return super.delete(instructor);
  }

  getInstructor(id: number): Observable<IInstructor> {
    return super.read(id);
  }

  save(instructor: Instructor){
    if(instructor.id)
      return this.updateInstructor(instructor)
    else
      return this.addInstructor(instructor)
  }

}
