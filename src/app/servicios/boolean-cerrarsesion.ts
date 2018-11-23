import { Injectable } from '@angular/core';
import { Observable, throwError, Subject} from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
export class MyBooleanService {
    myBool$: Observable<boolean>;

    private boolSubject: Subject<boolean>;

    constructor() {
        this.boolSubject = new Subject<boolean>();
        this.myBool$ = this.boolSubject.asObservable();
    }

    public setBool(newValue) {
      this.myBool$ = newValue;
      this.boolSubject.next(newValue);
    }
}