import { Injectable } from '@angular/core';
import { Actualite } from '../model/actualite';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ActualiteService {
  apiURL = 'http://localhost:5000/api/actualites';
  act:Actualite;
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':localStorage.getItem('id_token')
    })
  }


  //get all associations
  readAll(): Observable<any> {
    return this.http.get(this.apiURL,this.httpOptions);

  }


  Add(act): Observable<Actualite> {
    return this.http.post<Actualite>(this.apiURL , JSON.stringify(act), this.httpOptions)



  }

  //delete an association
delete(id){


  return this.http.delete(this.apiURL + '/' + id, this.httpOptions)

}


//modifier user
update(id, act): Observable<Actualite> {

  return this.http.put<Actualite>(this.apiURL + '/' + id, JSON.stringify(act), this.httpOptions)



}
}
