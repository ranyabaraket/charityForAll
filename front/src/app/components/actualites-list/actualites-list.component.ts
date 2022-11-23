import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Actualite } from 'src/app/model/actualite';
import { ActualiteService } from 'src/app/services/actualite.service';
@Component({
  selector: 'app-actualites-list',
  templateUrl: './actualites-list.component.html',
  styleUrls: ['./actualites-list.component.css'],
})
export class ActualitesListComponent implements OnInit {
  acts: Actualite[];
  constructor(private actServ: ActualiteService, private router: Router) {}

  ngOnInit(): void {
    this.readActs();
  }
  readActs(): void {
    this.actServ.readAll().subscribe(
      (acts) => {
        this.acts = acts;
        console.log(acts);
        //console.log(users);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openActualite(actualite: Actualite) {
    this.router.navigate(['/actualite/' + actualite._id]);
    console.log(actualite);
  }
}
