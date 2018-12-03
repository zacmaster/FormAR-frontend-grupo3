import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse} from '../modelos/jwt-response';
import { AuthLoginInfo} from '../modelos/login-info';
import { SignUpInfo} from '../modelos/signup-info';
import { GLOBAL } from '../servicios/global';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = GLOBAL.url+"auth/signin";
  private signupUrl = GLOBAL.url+"auth/signup";

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    //console.log("Paso por el signup");
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
}
