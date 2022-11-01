import { Injectable } from '@angular/core';
import { Donneur } from '../model/donneur.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DonneurService {
  apiURL = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('id_token'),
    }),
  };
  //get all donneurs
  readAll(): Observable<any> {
    return this.http.get(this.apiURL);
  }

  //delete an donor
  delete(id) {
    return this.http.delete(this.apiURL + '/donneur/' + id, this.httpOptions);
  }

  //modifier user
  update(id, donneur): Observable<Donneur> {
    return this.http.put<Donneur>(
      this.apiURL + '/donneur/' + id,
      JSON.stringify(donneur),
      this.httpOptions
    );
  }
}
