import { Component, OnInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cheminLogo="../../../assets/images/logo-lght.png";
  about1="../../../assets/images/about21.jpg";
  imgs:String[]=["../../../assets/images/charity3.webp","../../../assets/images/charity2.webp","../../../assets/images/charity1.webp"]

  notlogged:boolean;
  navbarfixed:boolean = false;
  role:String="";
  constructor(private router:Router ,private authService:AuthService) {this.notlogged=this.authService.notLoggedIn();
  this.role=this.authService.Role();
  }

  ngOnInit(): void {
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

@HostListener('window:scroll',['$event']) onscroll(){
    if(window.scrollY > 100)
    {
      this.cheminLogo="../../../assets/images/logo.png";
      this.navbarfixed = true;
    }
    else
    {
      this.cheminLogo="../../../assets/images/logo-lght.png";
      this.navbarfixed = false;
    }
  }


  logout(){
    this.authService.logout();

    this.router.navigate(['/'])
      }


}
