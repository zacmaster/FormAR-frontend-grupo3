import { Injectable } from '@angular/core';

import { IArea } from '../interfaces/iarea';
import { Area } from '../modelos/area';

import { GLOBAL } from './global';
import { Observable} from 'rxjs';
import { ResourceService } from './resource.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AreaService extends ResourceService<Area, IArea>{

  constructor(private _http: HttpClient) {
    super(_http, GLOBAL.url + 'v1/areas', '');
  }

  public getAreas(): Observable<IArea[]>{
    return super.list();
  }

  addArea(area: Area): Observable<Area>{
    return super.create(area);
  }

  updateArea(area: Area){
    console.log("area: ", area);
    
    return super.update(area);
  }


  deleteArea(area: Area): Observable<{}>{
    return super.delete(area);
  }

  getArea(id: number): Observable<IArea> {
    return super.read(id);
  }


  save(area: Area){
    if(area.id)
      return this.updateArea(area)
    else
      this.addArea(area)
  }



}
