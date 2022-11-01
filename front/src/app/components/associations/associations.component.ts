import { Component, OnInit ,ViewChild} from '@angular/core';
import { AssocService } from 'src/app/services/assoc.service';
import { Association } from 'src/app/model/association.model';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
import { User } from 'src/app/model/user.model';
@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
  styleUrls: ['./associations.component.css']
})
export class AssociationsComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  associations:Association[];
  assoc:Association;
deletedId:Number;
closeResult:string;
updatedId:Number;
connectedUser:User

  constructor(private observer: BreakpointObserver,private assocService:AssocService,private modalService: NgbModal,private router:Router,private flashMessage:FlashMessagesService,private authService:AuthService,private serivceNotif:NotificationsService) { this.assoc=new Association(); }

  ngOnInit(): void {
    this.readAssociations();
    this.connectedUser=this.authService.connectedUser();

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

  readAssociations(): void {
    this.assocService.readAll()
      .subscribe(
        assocs => {
          this.associations = assocs;
          console.log(assocs);
          //console.log(users);
        },
        error => {
          console.log(error);
        });
  }



  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  openDelete(targetModal, id: Number) {
    this.deletedId=id;
        console.log(id)
        this.modalService.open(targetModal, {
          backdrop: 'static',
          size: 'lg'
        });
      }


      delete() {

        this.assocService.delete(this.deletedId).subscribe(res => {
          console.log(this.deletedId)
             this.associations = this.associations.filter(item => item._id !== this.deletedId);
             this.ngOnInit();
             this.modalService.dismissAll();
             //console.log('Client deleted successfully!');

        },err=>{
          this.flashMessage.show(err['error'].msg, { cssClass: 'alert-danger' } );
          this.modalService.dismissAll();
         this.authService.logout()

         setTimeout(() => {
          this.router.navigate(['/EspaceAdmin/login'])
         }, 3000);

          console.log(err['error'].msg)
        })

      }
      openUpdate(targetModal,associa: Association){
        this.updatedId=associa._id;
        this.assoc.nom=associa.nom;
        this.assoc.username=associa.username;
        this.assoc.siege=associa.siege;
        this.assoc.telephone=associa.telephone;
        this.assoc.domaineActivite=associa.domaineActivite;

        this.modalService.open(targetModal, {
          backdrop: 'static',
          size: 'lg'
        });
      }
      logout(){
        this.authService.logout();
        this.flashMessage.show('You logged out!', { cssClass: 'alert-success' } )
        this.router.navigate(['/EspaceAdmin/login'])
          }
      //modifier un client
modifier(){


  if(this.assoc.nom===""||this.assoc.telephone.toString()===""||this.assoc.siege==="")
  {
    //this.flashMessage.show("Il faut remplir tous les informations", { cssClass: 'alert-danger' } );
    this.serivceNotif.error('error',"il faut remplir tous les champs !",{
      position:['bottom','right'],
      timeOut:2000,
      animate:'fade',
      showProgressBar:true,

    });
   // this.modalService.dismissAll();
  }

  else{

    this.assocService.update(this.updatedId, this.assoc).subscribe(res => {

      console.log('Post updated successfully!');

      this.ngOnInit();
      this.modalService.dismissAll();
      console.log('Client updated successfully!');

 },err=>{
   this.flashMessage.show(err['error'].msg, { cssClass: 'alert-danger' } );
   this.modalService.dismissAll();
  this.authService.logout()

  setTimeout(() => {
   this.router.navigate(['/EspaceAdmin/login'])
  }, 3000);

   console.log(err['error'].msg)
 })


  }
}

}
