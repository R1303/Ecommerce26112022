import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})

export class WelcomeDataService {

  constructor(private http:HttpClient) { }

  excuteGetWelcomeData(){
    try {
      return this.http.get<HelloWorldBean>(`${API_URL}/helloworldbean`);
    } catch (error) {
      return this.http.get("Something Went Wrong! Please Contact Support.")
    }
  }

  excuteGetWelcomeDataWithParameter(name:string){
    // let basicAuthoriztion=this.createBasicAuthorization();
    // let headers=new HttpHeaders({
    //   Authorization : basicAuthoriztion
    // })
    try {
      return this.http.get<HelloWorldBean>(`${API_URL}/action/${name}`,//{headers}
      );
    } catch (error) {
      return this.http.get("Something Went Wrong! Please Contact Support.")
    }
  }

  // createBasicAuthorization(){
  //   let user="rajan"
  //   let password="rajan123"
  //   return "Basic "+window.btoa(user+':'+password)
  // }
}

export class HelloWorldBean{
  constructor(public msg:string){}
}
