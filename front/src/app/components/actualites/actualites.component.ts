import { Actualite } from './../../model/actualite';
import { Component, OnInit,ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ActualiteService } from 'src/app/services/actualite.service';
import { Categorie } from 'src/app/model/categorie.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { CategorieService } from 'src/app/services/categorie.service';
import { User } from 'src/app/model/user.model';

ActualiteService
@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css']
})
export class ActualitesComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  categories:Categorie[];
  acts:Actualite[];
  connectedUser:User;
  act:Actualite;
  categ:Categorie;
  imageupdated:any;
deletedId:Number;
closeResult:string;
updatedId:Number;
  constructor(private observer: BreakpointObserver,private categService:CategorieService,private modalService: NgbModal,private router:Router,private flashMessage:FlashMessagesService,private authService:AuthService,private serivceNotif:NotificationsService,private actServ:ActualiteService) {
    this.act=new Actualite();
    this.categ=new Categorie(); }
    image:any;
    msg:string="";
  ngOnInit(): void {
    this.connectedUser=this.authService.connectedUser();
    this.readActs();
  }
  readActs(): void {
    this.actServ.readAll()
      .subscribe(
        acts => {
          this.acts = acts;
          console.log(acts);
          //console.log(users);
        },
        error => {
          console.log(error);
        });
  }


  open(content) {
    this.act=new Actualite();
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

        console.log("id mta3 el act"+id)
        this.modalService.open(targetModal, {
          backdrop: 'static',
          size: 'lg'
        });
      }



      delete() {

        this.actServ.delete(this.deletedId).subscribe(res => {
          console.log(this.deletedId)
             this.acts = this.acts.filter(item => item._id !== this.deletedId);
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

      openUpdate(targetModal,act: Actualite){
        this.updatedId=act._id;
        this.act.nom=act.nom;
        this.act.designation=act.designation;
        if(this.image!=null){this.act.image=this.image}
        else{this.act.image=act.image}


        this.modalService.open(targetModal, {
          backdrop: 'static',
          size: 'lg'
        });
      }


      modifier(){

        if(this.act.nom===""||this.act.designation==="")
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
  this.act.image=this.image;
  this.actServ.update(this.updatedId, this.act).subscribe(res => {

    console.log('Post updated successfully!');

    this.ngOnInit();
    this.modalService.dismissAll();
    console.log('Client updated successfully!');

},err=>{
 //this.flashMessage.show(err['error'].msg, { cssClass: 'alert-danger' } );
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
        if(this.act.nom===""||this.act.designation==="")
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
        this.act.image=this.image
        this.actServ.Add(this.act).subscribe((result) => {

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

      select(event){

        if(!event.target.files[0] || event.target.files[0].length == 0) {
          this.msg = 'You must select an image';
          return;
        }
        var mimeType = event.target.files[0].type;

        if (mimeType.match(/image\/*/) == null) {
          this.msg = "Only images are supported";
          return;
        }


        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (_event) => {
          this.msg = "";
          this.image = reader.result;
        }

      }
      logout(){
        this.authService.logout();
        //this.flashMessage.show('You logged out!', { cssClass: 'alert-success' } )
        this.router.navigate(['/EspaceAdmin/login'])
          }
}
