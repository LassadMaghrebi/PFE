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
      let userInformation:any=jwt_decode(token)
      if(userInformation.user.role=="ADMIN")
      return true
      else
      return false
  }
  
}
