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
  headers =new HttpHeaders({'Authorization': ''+sessionStorage.getItem('token')})
  login(f:any){
    return this.http.post("http://localhost:3000/auth/login",f)
  }
  register(f:any){
    return this.http.post("http://localhost:3000/auth/register",f)
  }
  proprietaireRegister(f:any){
    return this.http.post("http://localhost:3000/auth/register",f)
  }
  findEmail(email:String){
    return this.http.post("http://localhost:3000/auth/email",{email:email})
  }
  forgotPassword(email:String){
    return this.http.post("http://localhost:3000/auth/forgot-password",{email:email})
  }
  resetPassword(password:String){
    const headers = { 'token': sessionStorage.getItem('reset-token')||""}
    return this.http.post("http://localhost:3000/auth/reset-password",{password:password},{headers:headers})
  }
  getUserData(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.get("http://localhost:3000/auth/profile",{headers:headers})
  }
  getUsers(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.get("http://localhost:3000/auth/all",{headers:headers})
  }
  activerCompte(id:string){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post("http://localhost:3000/auth/activer",{userId:id},{headers:headers})
  }
  desactiverCompte(id:string){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post("http://localhost:3000/auth/desactiver",{userId:id},{headers:headers})
  }

}
