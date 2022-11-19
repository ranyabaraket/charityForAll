import { Component, OnInit,HostListener } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cheminLogo="../../../assets/images/logo-lght.png";
  about1="../../../assets/images/about21.jpg";
  imgs:String[]=["../../../assets/images/charity3.webp","../../../assets/images/charity2.webp","../../../assets/images/charity1.webp"]
  navbarfixed:boolean = false;
  constructor() { }

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





}
