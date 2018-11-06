import { Injectable } from '@angular/core';

import { GLOBAL } from './global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { ResourceService } from "./resource.service";
import { Tarea } from '../modelos/tarea';
import { ITarea } from '../interfaces/itarea';


@Injectable({
  providedIn: 'root'
})
export class TareaService extends ResourceService<Tarea, ITarea>{

  constructor(private _http: HttpClient) {
    super(_http,GLOBAL.url + 'tareas','');
   }

  public getTareas(): Observable<ITarea[]>{
    return super.list();
  }
  
  addTarea(tarea: Tarea): Observable<Tarea>{
    console.log("posteando: ",tarea)
    return super.create(tarea);
  }
  
  updateTarea(tarea: Tarea){
    return super.update(tarea);
  }

  deleteTarea(tarea: Tarea): Observable<{}>{
    return super.delete(tarea);
  }

  getTarea(id: number): Observable<ITarea> {
    return super.read(id);
  }

  save(tarea: Tarea){
    if(tarea.id)
      return this.updateTarea(tarea)
    else
      return this.addTarea(tarea)
  }

}