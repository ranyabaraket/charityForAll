import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../model/user.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  connectedUser: User;

  notlogged=false;
  closeResult = '';



  contactHistory: any = [];
  replyMsgList : any = [];
  totalReplyMsg : number = 0;

  contactFormGroup = new FormGroup({
    title : new FormControl('',[Validators.required]),
    query : new FormControl('',[Validators.required])
  });

  constructor(private authService: AuthService, private router: Router, private contactService: ContactService,private modalService: NgbModal) 
  { 
   
    this.connectedUser =  this.authService.connectedUser();

    this.showHistory();

    this.contactService.replyMessageHistory().subscribe((contactReplyHistory) => { 
      this.replyMsgList = contactReplyHistory.filter((a: { username: string; }) => a.username == this.connectedUser.username);
      this.totalReplyMsg = this.replyMsgList.length;
    });
   
  
   
    
  }

  ngOnInit(): void {
   
   
  
    
    
  }

  contactFormSubmit() {
    if(!this.contactFormGroup.valid) {
      alert('Please Enter Valiad Value !');
      return;
    }
    const contactForm = this.contactFormGroup.getRawValue();
    contactForm.username = this.connectedUser.username;
    contactForm.role = this.connectedUser.role;
       // console.log(contactForm);
    this.contactService.insertContactForm(contactForm).subscribe(s => {
      alert(s);
      this.router.navigate(['/']);
    } );
  }

  showHistory() {
    // console.log('showHistory');
    this.contactService.showHistory()
    .subscribe((contactHistory) => {
        this.contactHistory = contactHistory;
        this.contactHistory = this.contactHistory.filter((item: { username: string; }) => (item.username == this.connectedUser.username));
       
         console.log(this.contactHistory);
      }
    );
  }


  open(content) {
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
