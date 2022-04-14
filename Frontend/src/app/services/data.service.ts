import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  headers = { 'token': sessionStorage.getItem('reset-token')||""}
  constructor(private http:HttpClient) { 
  }
  getAllStadiums(page:number=0){
    return this.http.get("http://localhost:3000/stadiums/all"+page)
  }
  getStadiumById(stadiumId:string){
    return this.http.post("http://localhost:3000/stadiums/id",{stadiumId})
  }
}
