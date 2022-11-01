import { DonneurService } from './../../services/donneur.service';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { Donneur } from 'src/app/model/donneur.model';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user.model';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-donneurs',
  templateUrl: './donneurs.component.html',
  styleUrls: ['./donneurs.component.css'],
})
export class DonneursComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  donneurs: Donneur[];
  donneur: Donneur;
  deletedId: Number;
  closeResult: string;
  updatedId: number;
  connectedUser:User;
  constructor(
    private observer: BreakpointObserver,
    private DonneurService: DonneurService,
    private modalService: NgbModal,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private authService: AuthService
  ) {
    this.donneur = new Donneur();
  }

  ngOnInit(): void {
    //console.log(DonneurService);
    this.readDonneurs();
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


  readDonneurs(): void {
    this.DonneurService.readAll().subscribe(
      (utilisateur: Donneur[]) => {
        this.donneurs = utilisateur.filter((u) => u.role === 'donneur');
        console.log(utilisateur);
        //console.log(users);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  logout(){
    this.authService.logout();
    this.flashMessage.show('You logged out!', { cssClass: 'alert-success' } )
    this.router.navigate(['/EspaceAdmin/login'])
      }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openDelete(targetModal, id: Number) {
    this.deletedId = id;
    console.log(id);
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg',
    });
  }

  delete() {
    this.DonneurService.delete(this.deletedId).subscribe(
      (res) => {
        console.log(this.deletedId);
        this.donneurs = this.donneurs.filter(
          (item) => item._id !== this.deletedId
        );
        this.ngOnInit();
        this.modalService.dismissAll();
        //console.log('Client deleted successfully!');
      },
      (err) => {
        this.flashMessage.show(err['error'].msg, { cssClass: 'alert-danger' });
        this.modalService.dismissAll();
        this.authService.logout();

        setTimeout(() => {
          this.router.navigate(['/EspaceAdmin/login']);
        }, 3000);

        console.log(err['error'].msg);
      }
    );
  }

  openUpdate(targetModal, donor: Donneur) {
    this.updatedId = donor._id;
    this.donneur.nom = donor.nom;
    this.donneur.prenom = donor.prenom;
    this.donneur.username = donor.username;
    this.donneur.telephone = donor.telephone;

    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg',
    });
  }

  //modifier un client
  modifier() {
    this.DonneurService.update(this.updatedId, this.donneur).subscribe(
      (res) => {
        console.log('Post updated successfully!');

        this.ngOnInit();
        this.modalService.dismissAll();
        console.log('Client updated successfully!');
      },
      (err) => {
        this.flashMessage.show(err['error'].msg, { cssClass: 'alert-danger' });
        this.modalService.dismissAll();
        this.authService.logout();
        setTimeout(() => {
          this.router.navigate(['/EspaceAdmin/login']);
        }, 3000);
        console.log(err['error'].msg);
      }
    );
  }
}
