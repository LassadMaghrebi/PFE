import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  page=""
  constructor(private auth:AuthentificationService) {
    auth.loggedIn.subscribe(res=>{
      this.loggedin=res
    })
  }
  loggedin=false
  ngOnInit(): void {
  }
  logout(){
    this.loggedin=false
    sessionStorage.clear()
  }

}
