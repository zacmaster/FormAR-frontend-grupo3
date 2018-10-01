import { HttpHeaders } from "@angular/common/http";

export var GLOBAL = {
    //url con mock objects
    url: 'http://localhost:3000/',

    httpOptions : {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'my-auth-token'
        })
    }
}