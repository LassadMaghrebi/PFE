import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!sessionStorage.getItem('token')) return false;
      let token=sessionStorage.getItem('token')||""
      let user:any=jwt_decode(token)
      console.log(user);
      
      if(user.role=="joueur")
      return true
      else
      return false
  }
  
}
