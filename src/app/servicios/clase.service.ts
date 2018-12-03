import { IClaseCursada } from '../interfaces/iclasecursada'
import { ClaseCursada } from '../modelos/clasecursada';

import { GLOBAL } from './global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { ResourceService } from "./resource.service";
import {Injectable} from "@angular/core";



@Injectable({
  providedIn: 'root'
})
export class ClaseService extends ResourceService<ClaseCursada, IClaseCursada>{

  constructor(private _http: HttpClient) {
    super(_http,GLOBAL.url + 'v1/clases','');
  }

  public getClases(cursadaId: number): Observable<IClaseCursada[]>{
    let url = GLOBAL.url + 'v1/clases/cursada/' + cursadaId;
    return super.listURL(url);
  }

  addClase(claseCursada: ClaseCursada): Observable<ClaseCursada>{
    console.log("posteando: ",claseCursada)
    return super.create(claseCursada);
  }

  updateClase(claseCursada: ClaseCursada){
    return super.update(claseCursada);
  }

  deleteClase(claseCursada: ClaseCursada): Observable<{}>{
    return super.delete(claseCursada);
  }

  getClase(id: number): Observable<IClaseCursada> {
    return super.read(id);
  }

  save(claseCursada: ClaseCursada){
    if(claseCursada.id)
      return this.updateClase(claseCursada)
    else
      return this.addClase(claseCursada)
  }
}
