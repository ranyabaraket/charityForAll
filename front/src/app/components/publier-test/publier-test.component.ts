import { DemandeService } from 'src/app/services/demande.service';
import { Demande } from './../../model/demande.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publier-test',
  templateUrl: './publier-test.component.html',
  styleUrls: ['./publier-test.component.css']
})
export class PublierTestComponent implements OnInit {
demande:Demande;
  constructor(private demandeService:DemandeService,private router:Router) {


    this.demande=new Demande()
  }

  ngOnInit(): void {
  }
  submit(){


    this.demandeService.Add(this.demande).subscribe((result) => {
      console.log(result)
      //this.ngOnInit();
    },
    err=>{
      //this.flashMessage.show(err['error'].msg, { cssClass: 'alert-danger' } );
      //this.modalService.dismissAll();
     //this.authService.logout()

     setTimeout(() => {
      this.router.navigate(['/EspaceAdmin/login'])
     }, 3000);

      console.log(err['error'].msg)
    }



    );
  //this.modalService.dismissAll(); //dismiss the modal

  }
}
