import { DemandeService } from 'src/app/services/demande.service';
import { Besoin } from './../../model/besoin.model';
import { Demande } from './../../model/demande.model';

import { Component, OnInit,ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-publier',
  templateUrl: './publier.component.html',
  styleUrls: ['./publier.component.css']
})
export class PublierComponent implements OnInit {
  user:any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  listBesoin: Besoin[] = [];

  demande:Demande;
  besoin:Besoin;

  constructor(private observer: BreakpointObserver,private router:Router,private authService:AuthService,private demandeService:DemandeService) {this.demande=new Demande()
  this.besoin=new Besoin()

  }

  ngOnInit(): void {
    this.user=this.authService.connectedUser()
  }
  logout(){
    //this.authService.logout();
    //this.flashMessage.show('You logged out!', { cssClass: 'alert-success' } )
    //this.router.navigate(['/'])
    //console.log("this demandes "+this.demandes[1]['besoins'][0]['description'])

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

      addToList(){


this.besoin.quantite_restante=this.besoin.quantite_initial;

this.listBesoin.push({
  "description": this.besoin.description,
  "quantite_initial": this.besoin.quantite_initial,
  "quantite_restante":this.besoin.quantite_restante,
  "categorie": this.besoin.categorie,

})
console.log(this.listBesoin)

      }
      submit(){


        this.demande.date_pub="21/11/2022";
        this.demande.assoc=this.user.nom;
        this.demande.besoins=this.listBesoin;
        this.demande.etat="Pending";
        this.demandeService.Add(this.demande).subscribe((result) => {
          console.log(this.demande.etat)
          console.log("ddddd")

          this.router.navigate(['/EspaceAssoc/profile'])
        },
        err=>{





          console.log(err['error'].msg)
        }



        );



              }

              supprimer(num){
                console.log(num)
                var tab = this.listBesoin.filter(item => item.description.toString() != num);
                this.listBesoin=tab;


              }
}
