import { Injectable } from '@angular/core';

import { GLOBAL } from './global';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class BackupService {

  constructor(private _http: HttpClient) {}

  getBD(){
    let url = GLOBAL.url + 'backup'
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/sql');
    return this._http.get(url, { headers: headers, responseType: 'blob' });
   
  }

  setBD(item:File){
    let url = GLOBAL.url + 'backup'
    var fd = new FormData();
        fd.append('file', item);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');
    return this._http.post(url, fd,{ headers: headers});
   
  }
  uploadFile(file:File):Promise<any> {
    let url = GLOBAL.url + 'backup'
    return new Promise((resolve, reject) => {

        let xhr:XMLHttpRequest = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(<any>JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        };

        xhr.open('POST', url, true);

        let formData = new FormData();
        formData.append("file", file, file.name);
        xhr.send(formData);
    });
}


}
