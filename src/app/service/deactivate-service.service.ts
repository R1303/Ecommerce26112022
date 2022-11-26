import { Injectable } from '@angular/core';
import {CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DeactivateServiceService implements CanActivate {

  constructor(private hardcodedAuthenticationService: HardcodedAuthenticationService
    ,private router:Router) { }
  path: ActivatedRouteSnapshot[];
  component: Object;
  route: ActivatedRouteSnapshot;

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    if (this.hardcodedAuthenticationService.isUserLoggedIn()){
      this.router.navigate(['main']);
      return false;
    }
    return true;
  };
}
