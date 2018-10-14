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

  public getCursos(): Observable<Icursada[]>{
    return super.list();
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


  save(cursada: Cursada){
    if(cursada.id)
      return this.updateCursada(cursada)
    else
      this.addCursada(cursada)
  }

}
