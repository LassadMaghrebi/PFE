import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-owner-signin',
  templateUrl: './owner-signin.component.html',
  styleUrls: ['./owner-signin.component.scss']
})
export class OwnerSigninComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router,private auth:AuthentificationService) { }
  erreur=""
  ngOnInit(): void {
  }
  submit(f:any){
    this.erreur=""
    this.auth.signin(f.value).subscribe((resp:any)=>{
      if(resp){
        sessionStorage.setItem("username",resp.name)
        sessionStorage.setItem("userId",resp.id)
        this.router.navigateByUrl("/home")
      }else{
        this.erreur="Verify your username Or password"
      }
    })
  }

}