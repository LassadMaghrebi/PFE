import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-owner-signup',
  templateUrl: './owner-signup.component.html',
  styleUrls: ['./owner-signup.component.scss']
})
export class OwnerSignupComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router,private auth:AuthentificationService) { }
  erreur=""
  ngOnInit(): void {
  }
  verif=false
  email=""
  position=""
  submit(f:any){
    if(f.name.length>3 && f.age>16 && (f.password==f.cpwd)&& this.verif){
    this.auth.signUp(f).subscribe((resp:any)=>{
      if(resp){
        console.log(resp)
        this.router.navigateByUrl('/Dashboard')
        sessionStorage.setItem("username",resp.name)
        sessionStorage.setItem("userId",resp.id)
      }
    })
  }
  }
  verifEmail(){
    this.erreur=""
    if(this.email!=""){
    this.http.get("http://localhost:8080/clients/find/"+this.email).subscribe((resp:any)=>{
      console.log(resp)
      if(resp==null){
        this.erreur=""
        this.verif=true
  }else{
        this.verif=false
        this.erreur="Email Deja existe"
      }
    })
  }
}
getPosition(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

     console.log(position.coords);
     this.position=position.coords.longitude+","+position.coords.latitude
    });
  }
  else {
    alert("Geolocation is not supported by this browser.");
  }
}
}