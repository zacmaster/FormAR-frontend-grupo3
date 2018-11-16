import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private administrativoURL = 'http://localhost:3000/api/test/administrativo';
  private instructorURL = 'http://localhost:3000/api/test/instructor';
  private supervisorURL = 'http://localhost:3000/api/test/supervisor';

  constructor(private http: HttpClient) { }

  getAdministrativoBoard(): Observable<string> {
    return this.http.get(this.administrativoURL, { responseType: 'text' });
  }

  getInstructorBoard(): Observable<string> {
    return this.http.get(this.instructorURL, { responseType: 'text' });
  }

  getSupervisorBoard(): Observable<string> {
    return this.http.get(this.supervisorURL, { responseType: 'text' });
  }
}
