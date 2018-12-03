import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Pago } from '../modelos/pago';
import { IPago } from '../interfaces/ipago';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService extends ResourceService<Pago,IPago>{

  constructor(private _http: HttpClient) { 
    super(_http, GLOBAL.url + 'v1/pagos','');
  }

  public getPagos(): Observable<IPago[]>{
    return super.list();
  }

  getArray(url: string): Observable<IPago[]>{
    return super.listURL(url);
  }

  addPago(pago: Pago): Observable<Pago>{
    return super.create(pago);
  }

  updatePago(pago: Pago){
    console.log("pago: ", Pago);
    return super.update(pago);
  }

  deleteCursada(pago: Pago): Observable<{}>{
    return super.delete(pago);
  }

  getPago(id: number): Observable<IPago> {
    return super.read(id);
  }

  getPagosAlumno(id:number):Observable<IPago[]>{
    let url = GLOBAL.url + 'v1/pagos/alumno/' + id;
    return super.listURL(url);
  }

  save(pago: Pago){
    if(pago.id)
      return this.updatePago(pago)
    else
      this.addPago(pago)
  }
  getEstadoCuenta(id: number){
    let url = GLOBAL.url + 'v1/pagos/estadoCuenta/' + id;
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this._http.get(url, { headers: headers, responseType: 'blob' });
   
  }

}
