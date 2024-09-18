import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor(private basicAuthService:BasicAuthenticationService) { }

  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    let basicAuthString= this.basicAuthService.getAuthorizedToken();
    let userName = this.basicAuthService.getAuthorizedUser();
    if(basicAuthString && userName){
    req = req.clone({
      setHeaders:{
        Authorization :basicAuthString
      } 
    })
  }
    return next.handle(req);
  }
}
