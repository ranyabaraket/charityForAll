
import { Component, OnInit,ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-donneur-profile',
  templateUrl: './donneur-profile.component.html',
  styleUrls: ['./donneur-profile.component.css']
})
export class DonneurProfileComponent implements OnInit {
  cheminLogo="../../../assets/images/logo-lght.png";
  constructor(private observer: BreakpointObserver,private router:Router,private authService:AuthService) {  }

  ngOnInit(): void {

  }

}
