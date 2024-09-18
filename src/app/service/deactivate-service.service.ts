import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router,CanActivate } from '@angular/router';
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
