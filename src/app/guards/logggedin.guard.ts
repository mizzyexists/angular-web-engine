import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogggedinGuard implements CanActivate {
  token: string;
  constructor(
    private router: Router
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = window.localStorage.getItem('jwt');
    if(this.token){
        this.router.navigate(['dashboard']);
        return false;
    }
    if(!this.token){
        return true;
    }
  }

}
