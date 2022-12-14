import { Component, OnInit } from '@angular/core';
import { Actualite } from 'src/app/model/actualite';
import { ActualiteService } from 'src/app/services/actualite.service';
@Component({
  selector: 'app-actualites-list',
  templateUrl: './actualites-list.component.html',
  styleUrls: ['./actualites-list.component.css']
})
export class ActualitesListComponent implements OnInit {
  acts:Actualite[];
  constructor(private actServ:ActualiteService) { }

  ngOnInit(): void {
    this.readActs();
    console.log(localStorage.getItem('id_token'))
  }
  readActs(): void {
    this.actServ.readAll()
      .subscribe(
        acts => {
          this.acts = acts;
          console.log(acts);
          //console.log(users);
        },
        error => {
          console.log(error);
        });
  }
}
