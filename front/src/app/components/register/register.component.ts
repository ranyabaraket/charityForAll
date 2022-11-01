import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import {NotificationsService} from 'angular2-notifications';
import { Association } from 'src/app/model/association.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:User;
  assoc:Association;
  errors:string;
  constructor(private router:Router,private authService:AuthService,private flashMessage:FlashMessagesService,private serviceNotif:NotificationsService) { this.user=new User();
  this.assoc=new Association();
  }

  ngOnInit(): void {
    this.selectedTeam='Donneur'
  }

  selectedTeam = '';
	onSelected(value:string): void {
		this.selectedTeam = value;
	}


  registerDonor() {
    this.authService.SignUpDonneur(this.user).subscribe (
      result => {
        // Handle result

       // this.flashMessage.show('Donneur Inscrit!', { cssClass: 'alert-success' } )

       this.serviceNotif.success('Success',"Vous etes inscrit ! ",{
        position:['bottom','right'],
        timeOut:2000,
        animate:'fade',
        showProgressBar:true,

      })
        console.log(result)
        //this.authService.storeUserData(result['token'],result['user'])

        setTimeout(()=>{                           // <<<---using ()=> syntax
          this.router.navigate(['/EspaceDonneur/login'])
      }, 1000);


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









  registerAssoc() {
    this.authService.SignUpAssoc(this.assoc).subscribe (
      result => {
        // Handle result

       // this.flashMessage.show('Donneur Inscrit!', { cssClass: 'alert-success' } )

       this.serviceNotif.success('Success',"Vous etes inscrit ! ",{
        position:['bottom','right'],
        timeOut:2000,
        animate:'fade',
        showProgressBar:true,

      })
        console.log(result)
        //this.authService.storeUserData(result['token'],result['user'])

        setTimeout(()=>{                           // <<<---using ()=> syntax
          this.router.navigate(['/EspaceAssoc/profile'])
      }, 1000);


      },
      error => {
        this.errors = error.message;

        //console.log("l erreeurr : "+error)
       // this.flashMessage.show(this.errors, { cssClass: 'alert-danger' } );
      },
      () => {
        // No errors, route to new page
      }
    );
  }



}

