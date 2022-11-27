import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Demande } from './../../model/demande.model';
import { Component, OnInit,ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DemandeService } from 'src/app/services/demande.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-profile-assoc',
  templateUrl: './profile-assoc.component.html',
  styleUrls: ['./profile-assoc.component.css']
})
export class ProfileAssocComponent implements OnInit {
  user:any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  demandes:any;
  deletedId:any
etat:any
  constructor(private observer: BreakpointObserver,private router:Router,private authService:AuthService,private demndService :DemandeService,private modalService: NgbModal,private serivceNotif:NotificationsService) { this.user=this.authService.connectedUser(); }

  ngOnInit(): void {
    this.readDemande();

console.log("this user "+this.user["nom"])

  }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])

      .subscribe((res:any) => {

        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(

        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
  logout(){
    //this.authService.logout();
    //this.flashMessage.show('You logged out!', { cssClass: 'alert-success' } )
    //this.router.navigate(['/'])
    //console.log("this demandes "+this.demandes[1]['besoins'][0]['description'])

      }



  readDemande(): void {
    this.demndService.getDemandeByAssocition(this.user["nom"])
      .subscribe(
        demandes => {
          this.demandes = demandes;
          console.log(demandes);
          //console.log(users);
        },
        error => {
          console.log(error);
        });
  }
cancel(){
  if(this.etat=="Pending")
  {
    this.demndService.delete(this.deletedId).subscribe(res => {
      console.log(this.deletedId)
         this.demandes = this.demandes.filter(item => item._id !== this.deletedId);
         this.ngOnInit();
         this.modalService.dismissAll();


    },err=>{

     this.authService.logout()
     this.modalService.dismissAll();
     setTimeout(() => {
      this.router.navigate(['/EspaceAdmin/login'])
     }, 3000);

      console.log(err['error'].msg)
    })
  }

}
openDelete(targetModal, id: Number,etat:String) {

 if(etat=="Pending")
 {
  this.deletedId=id;
  this.etat=etat
      console.log(id)
      this.modalService.open(targetModal, {
        backdrop: 'static',
        size: 'lg'
      });
 }
 else{
  this.serivceNotif.error('error',"Vous ne pouvez pas supprimer cette demande est déja traitée",{
    position:['bottom','right'],
    timeOut:2000,
    animate:'fade',
    showProgressBar:true,

  });
 }
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
}
