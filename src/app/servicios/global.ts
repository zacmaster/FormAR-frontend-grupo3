import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

export var GLOBAL = {
    //url con mock objects
    url: environment.url,

    httpOptions : {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'my-auth-token'
        })
    }
}