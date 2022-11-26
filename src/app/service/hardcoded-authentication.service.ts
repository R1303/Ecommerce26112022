import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }
  authenticate(username,password){
    if(username==='Rajan Rana' && password==="login"){
      sessionStorage.setItem('verifiedUser',username)
      return true;
    }
    return false;
  }
  
  isUserLoggedIn(){
    var user=sessionStorage.getItem('verifiedUser')
    return !(user===null)
  }

  logout(){
    sessionStorage.removeItem('verifiedUser');
  }

}
