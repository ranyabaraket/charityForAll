import { DonService } from './../../services/don.service';
import { Don } from './../../model/don.model';
import { DemandeService } from 'src/app/services/demande.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';
import { Demande } from './../../model/demande.model';
import { Besoin } from 'src/app/model/besoin.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {
  cheminLogo="../../../assets/images/logo-lght.png";
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
  refDemande:String;
  id_demande:String;
Besoinsss:String[]
don :Don
  constructor(private router:Router, private activatedRoute:ActivatedRoute,private observer: BreakpointObserver,private modalService: NgbModal,private auth:AuthService,private dmService:DemandeService,private donServ:DonService) {this.besoins=new Besoin()
    this.don=new Don()
    this.d=new Demande() }

  ngOnInit(): void {

    this.user=this.auth.connectedUser()
    this.besoins1=history.state;

    this.entries = Object.entries(this.besoins1);
    this.allBesoins=this.entries[6][1]
    console.log(this.entries)
    this.id_demande=this.entries[0][1]
    this.refDemande=this.entries[1][1]
    this.don.id_demande=this.id_demande
    this.don.refDemande=this.refDemande
    this.don.besoins=this.allBesoins
    this.don.donneur=this.user['username']
    this.don.etat="Pending"
    console.log("id 1 "+this.don.id_demande)
    console.log("ref 1 "+this.don.refDemande)

  }

  test(){
    console.log("besoins "+this.don.besoins[0]['quantite_donee'])
    console.log("besoins "+this.don.besoins[0]['description'])
    console.log("besoins "+this.don.besoins[0]['quantite_initial'])
    console.log("besoins "+this.don.besoins[0]['_id'])


    console.log("besoins "+this.don.besoins[1]['quantite_donee'])
    console.log("besoins "+this.don.besoins[1]['description'])
    console.log("besoins "+this.don.besoins[1]['quantite_initial'])
    console.log("besoins "+this.don.besoins[1]['_id'])
  }






  submit(){


    this.donServ.Add(this.don).subscribe((result) => {

      console.log('added')
      console.log(this.don)
      this.router.navigate(['/EspaceDonneur/profile']);
    },
    err=>{


      console.log('error added')
    }



    );




  }

}
