import { Injectable } from '@angular/core';
import { Contact } from '../model/contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError ,of } from 'rxjs';
import { ContactReplay } from '../model/contactReplay.model';

import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiURL = 'http://localhost:5000/api/contacts/';
  contact:Contact;
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':localStorage.getItem('id_token')
    })
  }

  insertContactForm(contactForm: any) {
    return this.http.post<any>(`${this.apiURL}contactUsInsert`,contactForm).pipe
    (
      switchMap(({msg}) => {
        return of(msg);
      }),
      catchError(err => {
        console.log(`server error occured`, err);
        return throwError(`failed please contact to admin`);
      })
    );
  }

  showHistory() {
    return this.http.get<any>(`${this.apiURL}contactUsHistory`).pipe
    (
      switchMap(({ contactHistory }) => {
        return of(contactHistory);
      }),
      catchError(error => {
        const msg = "Contact History not fetch. Please try again";
        return of(msg);
      })
    );
  }

  sendReplyMessage(replyMsg: any) {
    return this.http.post<any>(`http://localhost:5000/api/contactReplay/addContactReply`,replyMsg).pipe
    (
      switchMap(({msg}) => {
        return of(msg);
      }),
      catchError(err => {
        console.log(`server error occured`, err);
        return throwError(`failed please contact to admin`);
      })
    );
  }

  replyMessageHistory() {
    return this.http.get<any>(`http://localhost:5000/api/contactReplay/contactReplyHistory`).pipe
    (
      switchMap(({ contactReplyHistory }) => {
        return of(contactReplyHistory);
      }),
      catchError(error => {
        const msg = "Reply Msg History not fetch. Please try again";
        return of(msg);
      })
    );
  }

}
