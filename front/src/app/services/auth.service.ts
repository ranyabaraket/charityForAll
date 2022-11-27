import { Association } from 'src/app/model/association.model';
import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  public authToken:any;
  public user:any=null;
  public assoc=null;

  apiURL = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  }
  SignUpAssoc(assoc): Observable<Association> {
    return this.http.post<Association>(this.apiURL + '/api/users/register-resp', JSON.stringify(assoc), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  SignUpDonneur(user): Observable<User> {
    return this.http.post<User>(this.apiURL + '/api/users/register-donneur', JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  SignUp(user): Observable<User> {
    return this.http.post<User>(this.apiURL + '/api/users/register-user', JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
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


//login-donneur
authenticateDonneur(user){
  let headers=new Headers();
  return this.http.post(this.apiURL + '/api/users/login-donneur',JSON.stringify(user),this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
  }



  authenticateAdmin(user){
    let headers=new Headers();
    return this.http.post(this.apiURL + '/api/users/login-admin',JSON.stringify(user),this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
    }


//login-donneur
authenticateResp(user){
  let headers=new Headers();
  return this.http.post(this.apiURL + '/api/users/login-respAssoc',JSON.stringify(user),this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
  }


//storing data

storeUserData(token,user){
localStorage.setItem('id_token',token);
localStorage.setItem('user',JSON.stringify(user))
this.authToken=token;
this.user=user;

}
logout(){
  this.authToken=null;
  this.user=null;
  localStorage.clear();

}
loadToken() {
  const token = localStorage.getItem('id_token');
  this.authToken = token;
}


notLoggedIn(){
  this.loadToken()
  return helper.isTokenExpired(this.authToken);

}


isAdmin(){


    this.user=JSON.parse(localStorage.getItem('user'))

    if(this.user['role']=="admin"){return true}else{return false}


}

connectedUser()
{
  this.user=JSON.parse(localStorage.getItem('user'))
  return this.user
}

Role()
{
  this.user=JSON.parse(localStorage.getItem('user'))
  if(this.user!=null)
 { return this.user["role"]}else{return ""}
}
}
