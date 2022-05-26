import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // headers =new HttpHeaders({'Authorization': ''+sessionStorage.getItem('token')})
  // headers ={'Authorization': 'Bearer '+"gggg"}
  constructor(private http:HttpClient) {
    
  }
  getAllStades(filter:any){
    return this.http.get("http://localhost:3000/stade/all"+filter)
  }
  addStade(f:any){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post("http://localhost:3000/auth/test",f,{headers:headers})
  }
  getProprietaireStade(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post("http://localhost:3000/auth/test",{},{headers:headers})
  }
  getStadeById(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post("http://localhost:3000/auth/test",{},{headers:headers})
  }
  accepterDemandeStade(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post("http://localhost:3000/auth/test",{},{headers:headers})
  }
  getProprietaireReservation(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post("http://localhost:3000/auth/test",{},{headers:headers})
  }
  reserverStade(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post("http://localhost:3000/reservation/add",{},{headers:headers})
  }
  accepterReservation(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post("http://localhost:3000/auth/test",{},{headers:headers})
  }




  verif(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post("http://localhost:3000/auth/test",{},{headers:headers})
  }

}
