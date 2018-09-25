import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { IUsuario } from '../interfaces/iusuario';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // public _urlUsuarios: string = "assects/data/usuarios.json";
  public _urlUsuarios: string =  GLOBAL.url + '/usuarios';
  


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  
  constructor(private _http: HttpClient) { }

  // register(user_to_register: Usuario){
    //   let params = JSON.stringify(user_to_register);
    //   let headers = new Headers({'Content-Type':'application/json'});
    
    //   return  this._http.post(this._urlUsuarios + 'register', params, {headers: Headers})
    //                     .map(res => res.json());
    // }
    
    singup(user_to_login, gettoken = null){ 
      let json = JSON.stringify
    }
    
    getUsuarios(): Observable<IUsuario[]>{
      return this._http.get<IUsuario[]>(this._urlUsuarios)
    }

    save(usuario: Usuario) {
      if (usuario.id) {
        // return this.put(hero);
      }
      return this.post(usuario);
    }

    // Add new User
    private post(usuario: Usuario) {
      console.log("posting" +  usuario);
      
    return this._http.post(this._urlUsuarios,usuario,{
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
  