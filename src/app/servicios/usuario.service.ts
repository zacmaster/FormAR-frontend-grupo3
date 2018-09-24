import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { IUsuario } from '../interfaces/iusuario';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // public _url: string = "assects/data/usuarios.json";
  public _url: string = "http://localhost:3000/usuarios/";
  
  
  constructor(private _http: HttpClient) { }

  // register(user_to_register: Usuario){
    //   let params = JSON.stringify(user_to_register);
    //   let headers = new Headers({'Content-Type':'application/json'});
    
    //   return  this._http.post(this._url + 'register', params, {headers: Headers})
    //                     .map(res => res.json());
    // }
    
    singup(user_to_login, gettoken = null){ 
      let json = JSON.stringify
    }
    
    getUsuarios(): Observable<IUsuario[]>{
      return this._http.get<IUsuario[]>(this._url)
    }

    save(usuario: Usuario) {
      if (usuario.id) {
        // return this.put(hero);
      }
      return this.post(usuario);
    }

    // Add new Hero
    private post(usuario: Usuario) {
      console.log("posting" +  usuario);
      
    return this._http.post(this._url,usuario,{
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
    
    
    }

    private handleError(res: HttpErrorResponse | any) {
      console.error(res.error || res.body.error);
      return observableThrowError(res.error || 'Server error');
    }



  }
  