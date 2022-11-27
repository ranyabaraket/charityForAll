import { Demande } from './../../model/demande.model';
import { DemandeService } from 'src/app/services/demande.service';
import { Besoin } from 'src/app/model/besoin.model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';

import { Component, OnInit,ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
@Component({
  selector: 'app-donnattion-list',
  templateUrl: './donnattion-list.component.html',
  styleUrls: ['./donnattion-list.component.css']
})
export class DonnattionListComponent implements OnInit {
  objects:any
  @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
    user:any

besoins1:any;
entries:any;
allBesoins;any;
quantite_finale:Number
  constructor(private router:Router, private activatedRoute:ActivatedRoute,private observer: BreakpointObserver,private auth:AuthService,private demndService:DemandeService) {this.user=this.auth.connectedUser()

  }


  modifier(id,qtRest,qtDonne) {
this.quantite_finale=qtRest-qtDonne
    this.demndService.updateQuantite(this.entries[3][1], id,this.quantite_finale).subscribe(
      (res) => {
        console.log('Post updated successfully!');

        this.ngOnInit();

        console.log('Client updated successfully!');
      },
      (err) => {

       console.log("error update")
       // console.log(err['error'].msg);
      }
    );
  }



  ngOnInit(): void {

    this.besoins1=history.state;

    this.entries = Object.entries(this.besoins1);
    this.allBesoins=this.entries[5][1]
    console.log(this.allBesoins)
    console.log(this.entries)


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
