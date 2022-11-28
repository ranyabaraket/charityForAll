import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { Demande } from './../../model/demande.model';
import { DemandeService } from 'src/app/services/demande.service';
import { AuthService } from './../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit,ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
@Component({
  selector: 'app-gestion-demandes',
  templateUrl: './gestion-demandes.component.html',
  styleUrls: ['./gestion-demandes.component.css']
})
export class GestionDemandesComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  user:any;
  action:any;
  etat:String;
  dm:Demande;
  demandes:any;
  updatedId:any;
  constructor(private router:Router,private observer: BreakpointObserver,private authService:AuthService,private demndService :DemandeService,private serivceNotif:NotificationsService,private modalService: NgbModal) { this.user=this.authService.connectedUser();this.dm=new Demande()}

  ngOnInit(): void {
    this.readDemande()
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

  readDemande(): void {
    this.demndService.readAll()
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
  openDelete(targetModal,id:Number, etat:String,action:String) {

    if(etat=="Pending")
    {
      this.updatedId=id
     this.etat=etat
         this.dm.etat=action
         console.log("action + "+this.action)
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
       modifier() {
        this.demndService.updateEtat(this.updatedId, this.dm).subscribe(
          (res) => {
            console.log('Post updated successfully!');

            this.ngOnInit();
            this.modalService.dismissAll();
            console.log('Client updated successfully!');
          },
          (err) => {

            this.modalService.dismissAll();
            this.authService.logout();
            setTimeout(() => {
              this.router.navigate(['/EspaceAdmin/login']);
            }, 3000);
           // console.log(err['error'].msg);
          }
        );
      }
}
