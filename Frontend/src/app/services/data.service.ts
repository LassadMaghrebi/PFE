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
    return this.http.post("http://localhost:3000/stade/add",f,{headers:headers})
  }
  getProprietaireStade(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.get("http://localhost:3000/stade/proprietaire",{headers:headers})
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
    return this.http.get("http://localhost:3000/reservation/proprietaire",{headers:headers})
  }


  reserverStade(form:any){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post("http://localhost:3000/reservation/reserver",form,{headers:headers})
  }
  accepterReservation(id:string){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.put("http://localhost:3000/reservation/accepter",{id:id},{headers:headers})
  }
  refuserReservation(id:string){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.delete("http://localhost:3000/reservation/refuser/"+id,{headers:headers})
  }




  verif(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post("http://localhost:3000/auth/test",{},{headers:headers})
  }

}
