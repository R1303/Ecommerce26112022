import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SrvRecord } from 'dns';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {
  otp:string;
  message:string;
  isValidOtp:boolean;
  showSpinner:boolean;
  constructor(private dataService:TodoDataService,
    private router:Router,
    private authService:BasicAuthenticationService) { }

  ngOnInit() {
  }

  verifyOtp(){
    this.showSpinner=true;
    (document.querySelector('#submitBtn') as HTMLElement).style.display="none";
    (document.querySelector('#submitBtnDisable') as HTMLElement).style.display="block";
    this.dataService.verifyOtp(this.otp).subscribe(
      response=>{
        this.message=response;
        //alert(this.message);
        if(this.message=="Verified"){
          this.isValidOtp=true;
          this.dataService.setOrderDetail(this.authService.getUserID(),this.dataService.getCheckOutDetail()).subscribe(
            response =>{
             this.router.navigate(['placeOrder']);
            }
          )
          
       }
       else{
         this.isValidOtp=false;
       }
      }
    )
    //if(this.message!=null){
      
      this.showSpinner=false;
   // }
    
  }

}
