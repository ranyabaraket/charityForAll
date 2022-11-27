import { Demande } from './../../model/demande.model';
import { DemandeService } from 'src/app/services/demande.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from './../../services/state.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit,ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Besoin } from 'src/app/model/besoin.model';
@Component({
  selector: 'app-list-besoins',
  templateUrl: './list-besoins.component.html',
  styleUrls: ['./list-besoins.component.css']
})
export class ListBesoinsComponent implements OnInit {
  besoins1:any
  allBesoins:Besoin[]=[]
  entries:any=null
  all:any
  besoins:Besoin
  deletedId:Number;
  closeResult:string;
  user:any;
  updatedID:any
  d:Demande;
  objects:any
  @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
    constructor(private router:Router, private activatedRoute:ActivatedRoute,private observer: BreakpointObserver,private modalService: NgbModal,private auth:AuthService,private dmService:DemandeService) {this.besoins=new Besoin()
      this.d=new Demande()}


  ngOnInit(): void {
    this.user=this.auth.connectedUser()
    this.besoins1=history.state;

    this.entries = Object.entries(this.besoins1);
    this.allBesoins=this.entries[6][1]
    this.updatedID=this.entries[0][1]
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
