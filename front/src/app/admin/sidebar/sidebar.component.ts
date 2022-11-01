import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private observer: BreakpointObserver,private router:Router,private authService:AuthService,private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.flashMessage.show('You logged out!', { cssClass: 'alert-success' } )
    this.router.navigate(['/EspaceAdmin/login'])
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
