import { Categorie } from './../../model/categorie.model';
import { Component, OnInit,ViewChild } from '@angular/core';

import { FlashMessagesService } from 'flash-messages-angular';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CategorieService } from 'src/app/services/categorie.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  categories:Categorie[];
  categ:Categorie;
deletedId:Number;
closeResult:string;
updatedId:Number;
connectedUser:User;
  constructor(private observer: BreakpointObserver,private categService:CategorieService,private modalService: NgbModal,private router:Router,private flashMessage:FlashMessagesService,private authService:AuthService,private serivceNotif:NotificationsService) {this.categ=new Categorie(); }

  ngOnInit(): void {
    this.readCategories();
    this.connectedUser=this.authService.connectedUser();
  }


  readCategories(): void {
    this.categService.readAll()
      .subscribe(
        categories => {
          this.categories = categories;
          console.log(categories);
          //console.log(users);
        },
        error => {
          console.log(error);
        });
  }


  open(content) {
    this.categ=new Categorie();
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

      logout(){
        this.authService.logout();
        this.flashMessage.show('You logged out!', { cssClass: 'alert-success' } )
        this.router.navigate(['/EspaceAdmin/login'])
          }

      delete() {

        this.categService.delete(this.deletedId).subscribe(res => {
          console.log(this.deletedId)
             this.categories = this.categories.filter(item => item._id !== this.deletedId);
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

      openUpdate(targetModal,categ: Categorie){
        this.updatedId=categ._id;
        this.categ.nom=categ.nom;
        this.categ.description=categ.description;


        this.modalService.open(targetModal, {
          backdrop: 'static',
          size: 'lg'
        });
      }


      modifier(){

        if(this.categ.nom===""||this.categ.description==="")
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

else
{
  this.categService.update(this.updatedId, this.categ).subscribe(res => {

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


      submit(){
        if(this.categ.nom===""||this.categ.description==="")
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

        this.categService.Add(this.categ).subscribe((result) => {

          this.ngOnInit();
        },
        err=>{
          this.flashMessage.show(err['error'].msg, { cssClass: 'alert-danger' } );
          this.modalService.dismissAll();
         this.authService.logout()

         setTimeout(() => {
          this.router.navigate(['/EspaceAdmin/login'])
         }, 3000);

          console.log(err['error'].msg)
        }



        );
      this.modalService.dismissAll(); //dismiss the modal

       }

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
}
