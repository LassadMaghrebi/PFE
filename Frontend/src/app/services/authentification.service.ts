import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http:HttpClient) { }
  login(f:any){
    return this.http.post("http://localhost:8080/clients/login",f)
  }
  register(f:any){
    return this.http.post("http://localhost:8080/clients",f)
  }
}
