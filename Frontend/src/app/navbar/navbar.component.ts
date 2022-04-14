import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  page=""
  constructor(private auth:AuthentificationService) {
    auth.IsLoggedIn().subscribe(res=>{
      this.loggedin=res
    })
  }
  loggedin=false
  ngOnInit(): void {
  }
  signOut(){
    this.loggedin=false
    this.auth.signOut()
  }

}
