import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient) {
        if(sessionStorage.getItem('token')!=null){
      this.loggedIn.next(true);
    }
  }
  signin(f:any){
    //Spring Boot : return this.http.post("http://localhost:8080/clients/login",f)
    return this.http.post("http://localhost:3000/auth/signin",f)
  }
  signUp(f:any){
    return this.http.post("http://localhost:3000/auth/signup",f)
  }
  verifEmail(Email:String){
    return this.http.post("http://localhost:3000/auth/email",{email:Email})
  }
  resetPassword(password:String){
    const headers = { 'token': sessionStorage.getItem('reset-token')||""}
    console.log(headers);
    
    return this.http.post("http://localhost:3000/auth/reset-password",{password:password},{headers:headers})
  }
  forgotPassword(Email:String){
    return this.http.post("http://localhost:3000/auth/forgot-password",{email:Email})
  }
  IsLoggedIn(){
    return this.loggedIn.asObservable();
  }
  LoggedIn(){
    this.loggedIn.next(true);
  }
  signOut(){
    this.loggedIn.next(false)
    const headers = { 'token': sessionStorage.getItem('token')||""}
    this.http.post("http://localhost:3000/auth/signout",{aa:'aa'},{headers:headers}).subscribe(()=>{      
      sessionStorage.clear()
    },()=>{      
      sessionStorage.clear()
    })
  }
}
