import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Cursada } from '../modelos/cursada';
import { Icursada } from '../interfaces/icursada';
import { GLOBAL } from './global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursadaService extends ResourceService<Cursada,Icursada>{

  constructor(private _http: HttpClient) { 
    super(_http, GLOBAL.url + 'cursadas','');
  }

  public getCursadas(): Observable<Icursada[]>{
    return super.list();
  }
  getArray(url: string): Observable<Icursada[]>{
    return super.listURL(url);
  }

  addCursada(cursada: Cursada): Observable<Cursada>{
    return super.create(cursada);
  }

  updateCursada(cursada: Cursada){
    console.log("cursada: ", cursada);
    
    return super.update(cursada);
  }

  deleteCursada(cursada: Cursada): Observable<{}>{
    return super.delete(cursada);
  }

  getCursada(id: number): Observable<Icursada> {
    return super.read(id);
  }
  getCursadasInstructor(id:number):Observable<Icursada[]>{
    let url = GLOBAL.url + 'cursadas/instructor/' + id;
    return super.listURL(url);
  }
  getCursadasInstructorFinalizadas(id:number):Observable<Icursada[]>{
    let url = GLOBAL.url + 'cursadas/instructor/' + id+'/finalizada';
    return super.listURL(url);
  }


  save(cursada: Cursada){
    if(cursada.id)
      return this.updateCursada(cursada)
    else
      this.addCursada(cursada)
  }

}
