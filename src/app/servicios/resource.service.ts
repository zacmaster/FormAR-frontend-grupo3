import { Resource } from '../componentes/resource';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GLOBAL } from './global';
import { catchError } from 'rxjs/operators';
import { Iresource } from '../interfaces/iresource';

export class ResourceService<T extends  Resource, I extends Iresource> {
  private httpOptions: Object;

  constructor(
    private httpClient: HttpClient,
    private url: string,
    private endpoint: string,
  ) {
    this.httpOptions =  GLOBAL.httpOptions;
   }

  public create(item: T): Observable<T>{
    var url = `${this.url}/${this.endpoint}`;
    console.log("url to post: ", url);
    
    return this.httpClient
      .post<T>(url, item,this.httpOptions)
      .pipe(catchError(this.handleError))
  }
  public read(id: number): Observable<I>{
    return this.httpClient
      .get<I>(`${this.url}/${this.endpoint}/${id}`)
      .pipe(catchError(this.handleError))
  }

  
  public update(item: T): Observable<T>{

    console.log("item:", item);
    
    let url = `${this.url}/${this.endpoint}`;
    console.log("url:::::   ",url);
    
 
    return this.httpClient
    .put<T>(url, item,this.httpOptions)
    .pipe(catchError(this.handleError))
  }
  
  public delete(item: T): Observable<{}>{
    return this.httpClient
    .delete(`${this.url}/${this.endpoint}${item.id}`, this.httpOptions)
    .pipe(catchError(this.handleError))
  }
  
  public list(): Observable<I[]>{
    let url = `${this.url}/${this.endpoint}`;
    console.log('url: ',url);
    
    return this.httpClient.get<I[]>(url);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


}
