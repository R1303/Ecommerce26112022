import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BasicAuthenticationService } from './basic-authentication.service';
import { TodoDataService } from './data/todo-data.service';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuardService implements CanActivate {

  constructor(private hardcodedAuthenticationService: HardcodedAuthenticationService
    ,private router:Router,private service:TodoDataService) { }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    if (this.hardcodedAuthenticationService.isUserLoggedIn()&&this.service.getCheckOutDetail()!=null)
      return true;
    this.router.navigate(['cart']);
    return false;
  };
}
