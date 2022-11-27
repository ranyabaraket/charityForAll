import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { User } from 'src/app/model/user.model';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { query } from '@angular/animations';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  queries : any = [];
  replyMsgList : any = [];
  customreplyMsgList : any = [];
  connectedUser:User;
  closeResult = '';
  id : any;
  

  replyMessageForm = new FormGroup({
    username : new FormControl('',[Validators.required]),
    replyMsg : new FormControl('',[Validators.required]),
    contactId : new FormControl('',[Validators.required])
  });

  constructor(private contactService: ContactService, private router: Router,private authService: AuthService,private flashMessage:FlashMessagesService,private observer: BreakpointObserver,private modalService: NgbModal  ) { 
    this.contactService.showHistory().subscribe((contactHistory) => { this.queries = contactHistory; });
    this.contactService.replyMessageHistory().subscribe((contactReplyHistory) => { this.replyMsgList = contactReplyHistory; });

    this.connectedUser = authService.connectedUser();
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


  sendReplyMessage() {
    if(!this.replyMessageForm.valid) {
      console.log('Please enter a valid reply message');
      alert('Please Enter Valiad Value !');
      return;
    }
    const replyMsgForm = this.replyMessageForm.getRawValue();
    // console.log(replyMsgForm);

    this.contactService.sendReplyMessage(replyMsgForm).subscribe(s => {
      alert(s);
      window.location.reload();
    });
  }

  setValue(query: any) {
    this.replyMessageForm.controls['replyMsg'].setValue(null);
    this.replyMessageForm.controls['contactId'].setValue(query._id);
    this.replyMessageForm.controls['username'].setValue(query.username);
  }

  

  

  setCustomReplyMsgList(id: string) {
    this.customreplyMsgList = this.replyMsgList.filter((a: { contactId: string; }) => a.contactId == id);
  }

  setId(id: string) {
    this.id = id;
  }

  logout(){
    this.authService.logout();
    this.flashMessage.show('You logged out!', { cssClass: 'alert-success' } )
    this.router.navigate(['/EspaceAdmin/login'])
      }


  ngOnInit(): void {
  }

  open(content ) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
        
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
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



}
