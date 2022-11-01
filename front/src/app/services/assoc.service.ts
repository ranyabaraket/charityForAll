import { Injectable } from '@angular/core';
import { Association } from '../model/association.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AssocService {
  apiURL = 'http://localhost:5000/api/associations';

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':localStorage.getItem('id_token')
    })
  }
//get all associations
  readAll(): Observable<any> {
    return this.http.get(this.apiURL);

  }


//delete an association
delete(id){


  return this.http.delete(this.apiURL + '/' + id, this.httpOptions)

}


//modifier user
update(id, assoc): Observable<Association> {

  return this.http.put<Association>(this.apiURL + '/' + id, JSON.stringify(assoc), this.httpOptions)



}

}
