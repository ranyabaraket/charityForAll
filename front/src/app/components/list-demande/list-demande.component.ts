import { DemandeService } from 'src/app/services/demande.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.css']
})
export class ListDemandeComponent implements OnInit {
  demandes:any;
  constructor(private demndService :DemandeService) { }


  ngOnInit(): void {
    this.readDemande()
  }
  readDemande(): void {
    this.demndService.getAcceptedDemand()
      .subscribe(
        demandes => {
          this.demandes = demandes;
          console.log(demandes);
          //console.log(users);
        },
        error => {
          console.log(error);
        });
  }
}
