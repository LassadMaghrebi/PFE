import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient) {
        if(sessionStorage.getItem('token')!=null){
      this.loggedIn.next(true);
    }
  }
  signin(f:any){
    return this.http.post("http://localhost:3000/auth/signin",f)
  }
  signUp(f:any){
    return this.http.post("http://localhost:3000/auth/signup",f)
  }
  findEmail(email:String){
    return this.http.post("http://localhost:3000/auth/email",{email:email})
  }
  forgotPassword(email:String){
    return this.http.post("http://localhost:3000/auth/forgot-password",{email:email})
  }
  resetPassword(password:String){
    const headers = { 'token': sessionStorage.getItem('reset-token')||""}
    console.log(headers);
    return this.http.post("http://localhost:3000/auth/reset-password",{password:password},{headers:headers})
  }

}
