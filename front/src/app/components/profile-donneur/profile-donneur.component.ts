import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-profile-donneur',
  templateUrl: './profile-donneur.component.html',
  styleUrls: ['./profile-donneur.component.css']
})
export class ProfileDonneurComponent implements OnInit {

  connectedUser: User;

  constructor(private authService: AuthService, private router: Router) 
  { 
    
    
   
    this.connectedUser=this.authService.connectedUser();  
    
  }

  ngOnInit(): void {
    this.connectedUser=this.authService.connectedUser();  
  }

}
