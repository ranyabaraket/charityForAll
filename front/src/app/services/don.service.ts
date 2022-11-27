import { Don } from './../model/don.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DonService {
  apiURL = 'http://localhost:5000/api/dons';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  }
  //get all associations
  readAll(): Observable<any> {
    return this.http.get(this.apiURL,this.httpOptions);

  }
  Add(don): Observable<Don> {
    return this.http.post<Don>(this.apiURL , JSON.stringify(don), this.httpOptions)



  }
}
