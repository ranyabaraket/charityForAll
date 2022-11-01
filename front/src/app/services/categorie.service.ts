import { Injectable } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  apiURL = 'http://localhost:5000/api/categories';

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

  //delete an association
delete(id){


  return this.http.delete(this.apiURL + '/' + id, this.httpOptions)

}

//modifier user
update(id, categ): Observable<Categorie> {

  return this.http.put<Categorie>(this.apiURL + '/' + id, JSON.stringify(categ), this.httpOptions)



}

Add(categ): Observable<Categorie> {
  return this.http.post<Categorie>(this.apiURL , JSON.stringify(categ), this.httpOptions)



}

// Error handling
handleError(error) {
  // console.log("error : ",error)
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error;
  } else {
    // Get server-side error
    errorMessage = error.error;
  }

  return throwError(errorMessage);
}

}
