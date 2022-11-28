import { AuthService } from './../../services/auth.service';
import { User } from './../../model/user.model';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';

import { Router } from '@angular/router';
@Component({
  selector: 'app-login-donneur',
  templateUrl: './login-donneur.component.html',
  styleUrls: ['./login-donneur.component.css']
})
export class LoginDonneurComponent implements OnInit {
  user:User;
  errors:string;
  constructor(private router:Router,private authService:AuthService,private flashMessage:FlashMessagesService) { this.user=new User(); }

  ngOnInit(): void {
  }
  login() {
    var connected:Boolean=false ;
    this.authService.authenticateDonneur(this.user).subscribe (
      result => {
        // Handle result

        this.flashMessage.show('Admin connected!', { cssClass: 'alert-success' } )
        console.log(result)
        this.authService.storeUserData(result['token'],result['user'])
        connected=true;
        this.router.navigate(['/EspaceDonneur/profile'])
      },
      error => {
        this.errors = error.message;
        if(!connected){
          this.authService.authenticateResp(this.user).subscribe (
            result => {
              // Handle result

              this.flashMessage.show('Admin connected!', { cssClass: 'alert-success' } )
              console.log(result)
              this.authService.storeUserData(result['token'],result['user'])
              connected=true;
              this.router.navigate(['/EspaceAssoc/profile'])
            },
            error => {
              this.errors = error.message;

              //console.log("l erreeurr : "+error)
              this.flashMessage.show(this.errors, { cssClass: 'alert-danger' } );
            },
            () => {
              // No errors, route to new page
            }
          );
        }




        else{//console.log("l erreeurr : "+error)
          this.flashMessage.show(this.errors, { cssClass: 'alert-danger' } );}


      },
      () => {
        // No errors, route to new page
      }
    );


  }
}
