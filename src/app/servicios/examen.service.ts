import { IExamen } from '../interfaces/iexamen'
import { Examen } from '../modelos/examen';

import { GLOBAL } from './global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { ResourceService } from "./resource.service";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class ExamenService extends ResourceService<Examen, IExamen>{

  constructor(private _http: HttpClient) {
    super(_http,GLOBAL.url + 'examenes','');
  }

  public getExamenes(cursadaId: number): Observable<IExamen[]>{
    let url = GLOBAL.url + 'examenes/cursada/' + cursadaId;
    return super.listURL(url);
  }

  addExamen(examen: Examen): Observable<Examen>{
    console.log("posteando: ",examen)
    return super.create(examen);
  }

  updateExamen(examen: Examen){
    return super.update(examen);
  }

  deleteExamen(examen: Examen): Observable<{}>{
    return super.delete(examen);
  }

  getExamen(id: number): Observable<IExamen> {
    return super.read(id);
  }

  save(examen: Examen){
    if(examen.id)
      return this.updateExamen(examen)
    else
      return this.addExamen(examen)
  }










}
