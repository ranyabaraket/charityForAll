import { Besoin } from 'src/app/model/besoin.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Demande } from '../model/demande.model';
@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  apiURL = 'http://localhost:5000/api/demandes';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  }
//get all associations
  readAll(): Observable<any> {
    return this.http.get(this.apiURL);

  }


  //delete an association
delete(id){


  return this.http.delete(this.apiURL + '/' + id)

}


//get demande by association
getDemandeByAssocition(asso){


  return this.http.get(this.apiURL + '/' + asso)

}

getAcceptedDemand(){


  return this.http.get(this.apiURL + '/getAll/' + 'Accepted',this.httpOptions)

}


//modifier demande
update(id, demande): Observable<Demande> {

  return this.http.put<Demande>(this.apiURL + '/' + id, JSON.stringify(demande),this.httpOptions)



}


//modifier demande
updateEtat(id, etat): Observable<Demande> {

  return this.http.put<Demande>(this.apiURL + '/' + id+'/update_etat', JSON.stringify(etat),this.httpOptions)



}

Add(dm): Observable<Demande> {
  return this.http.post<Demande>(this.apiURL , JSON.stringify(dm),this.httpOptions)



}


updateQuantite(idDemande, idBesoin,qt) {
  const body = { quantite_final: qt };
console.log("test from service "+JSON.stringify(qt))
  return this.http.put<any>(this.apiURL + '/' + idDemande+'/update_besoins/'+idBesoin ,body,this.httpOptions)



}

}
