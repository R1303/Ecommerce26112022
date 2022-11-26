import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';
import { BasicAuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(private hardcodedAuthenticationService: HardcodedAuthenticationService
    ,private router:Router,private service:BasicAuthenticationService) { }
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
 
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    if (this.hardcodedAuthenticationService.isUserLoggedIn()&&this.service.getUserID()=="10002")
      return true;
    this.router.navigate(['error']);
    return false;
  };
}
