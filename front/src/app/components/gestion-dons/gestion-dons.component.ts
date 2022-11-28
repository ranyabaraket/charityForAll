import { Don } from './../../model/don.model';
import { DonService } from './../../services/don.service';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
@Component({
  selector: 'app-gestion-dons',
  templateUrl: './gestion-dons.component.html',
  styleUrls: ['./gestion-dons.component.css']
})
export class GestionDonsComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  user:any;
  dons:Don[]

  constructor(private router:Router,private observer: BreakpointObserver,private authService:AuthService,private donServ:DonService) {this.user=this.authService.connectedUser() }

  ngOnInit(): void {
    this.readDons()
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
  readDons(): void {
    this.donServ.readAll()
      .subscribe(
        dons => {
          this.dons = dons;
          console.log(dons);
          //console.log(users);
        },
        error => {
          console.log(error);
        });
  }
}
