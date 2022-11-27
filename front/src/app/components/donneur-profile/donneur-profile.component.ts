import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-donneur-profile',
  templateUrl: './donneur-profile.component.html',
  styleUrls: ['./donneur-profile.component.css']
})
export class DonneurProfileComponent implements OnInit {

  connectedUser: User;

  constructor(private authService: AuthService, private router: Router) 
  { 
    
    this.connectedUser=this.authService.connectedUser();  
   

    
  }

  ngOnInit(): void {
  }

}
