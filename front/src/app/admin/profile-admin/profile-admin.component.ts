import { User } from 'src/app/model/user.model';
import { Component, OnInit,ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  connectedUser:User;
  constructor(private observer: BreakpointObserver,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
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
  logout(){
    this.authService.logout();
    //this.flashMessage.show('You logged out!', { cssClass: 'alert-success' } )
    this.router.navigate(['/EspaceAdmin/login'])
      }
}
