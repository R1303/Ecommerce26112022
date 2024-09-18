import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';
import { EncrDecrServiceService } from './encr-decr-service.service';
import * as CryptoJS from 'crypto-js';
import { User } from '../list-todos/list-todos.component';
import * as MobileDetect from 'mobile-detect';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {
  key = '123456$#@$^@1ERF';
  user: User;
  constructor(private http: HttpClient, private encrDecr: EncrDecrServiceService) { }

  excuteAuthenticationService(username, password) {
    let basicAuthoriztion = 'Basic ' + window.btoa(username + ':' + password);
    let headers = new HttpHeaders({
      Authorization: basicAuthoriztion
    })
    try {
      return this.http.get<AuthenticationClass>(`${API_URL}/basicAuth`, { headers }).pipe(
        map(
          data => {
            sessionStorage.setItem('verifiedUser', username);
            sessionStorage.setItem('token', basicAuthoriztion)
            return data
          },
          error => {
            return this.http.get("Something Went Wrong! Please Contact Support.")
          }
        )
      );
    } catch (error) {
      return this.http.get("Something Went Wrong! Please Contact Support.")
    }
  }

  excuteJWTAuthenticationService(username, password, email, phone, isRegister) {
    password = this.encrDecr.testEncrypt(password);
    
    return this.http.post<any>(`${API_URL}/authenticate`, { username, password, email, phone, isRegister }).pipe(
      map(
        data => {
          this.setAuthorizedUser(email);
          sessionStorage.setItem('verifiedUser', email);
          sessionStorage.setItem('token', `Bearer ${data.token}`);
          this.getUserDetail();
          return data
        }
      )
    );
  }



  isUserLoggedIn() {
    var user = sessionStorage.getItem('verifiedUser')
   // if (this.getAuthorizedToken() === "Bearer User Already Present") {
     // this.logout();
      //return false;
   // }
   // else {
      return !(user === null)
    //}

  }

  getAuthorizedUser() {
    return sessionStorage.getItem('verifiedUser')
  }

  setAuthorizedUser(username) {
    return sessionStorage.setItem('verifiedUser', username)
  }
  getAuthorizedToken() {
    //alert(sessionStorage.getItem('token'));
    if (sessionStorage.getItem('token') === "Bearer User Already Present") {
      return sessionStorage.getItem('token')
    }
    if (this.getAuthorizedUser != null && sessionStorage.getItem('token') != null) {
      var token = sessionStorage.getItem('token').split("%id%");
      return token[0];

    }

  }

  getUserID() {
    //  if (!(sessionStorage.getItem('token') === "Bearer User Already Present")) {
    //    var token = sessionStorage.getItem('token').split("%id%");
    //    sessionStorage.setItem('id',token[1]);
    //    return token[1];
    //  }
    //  else {
    //    return null;
    //  }

    return sessionStorage.getItem('id');
  }

  getUserDetail() {
    if (this.getUserID() != null) {
      this.getUser(this.getUserID()).subscribe(
        response => {
          this.user = response;
          sessionStorage.setItem('email', this.user.userEmail);
          sessionStorage.setItem('phone', this.user.userPhoneNumber);
          return this.user;
        },
        error => {
          return null;
        }
      );
    }
    else {
      return null;
    }
  }

  getEmail() {
    return sessionStorage.getItem('email')
  }
  getPhone() {
    return sessionStorage.getItem('phone')
  }
  getUserById() {
    return this.user;
  }

  getUser(id) {
    try {
      return this.http.get<User>(`${API_URL}/getUserById/${id}`);
    } catch (error) {
      return this.http.get<User>(`Error`);
    }
  }

  getAuthorizedTokenWithId() {
    return sessionStorage.getItem('token');
  }

  logout() {
    this.setAuthorizedUser(null);
    sessionStorage.removeItem('verifiedUser');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('phone');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('pic_type');

  }
  isAdmin(){
    if(this.getUserID()=="63de4647732cefaa102d9a48"){
      return true;
    }
    return false;
  }

  isPC(){
    var userAgent = window.navigator.userAgent;
    var md = new MobileDetect(userAgent);
    return md.mobile()==null;
  }

}

export class AuthenticationClass {
  constructor(public msg: string) { }
}
