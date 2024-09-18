import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { TodoDataService } from '../service/data/todo-data.service';
import { EncrDecrServiceService } from '../service/encr-decr-service.service';
import { User } from '../list-todos/list-todos.component';
import { stringify } from 'querystring';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = ''
  password = ''
  invalidLogin=false
  errorMsg='Invalid Credential'
  progress = 0;
  progressBar = document.querySelector('.progress-bar');
  intervalId;
  showProgress:boolean;
  doNotShowLoginForm:boolean;
  showSpinner:boolean;
  constructor(private router:Router,private hardcodedAuthenticationService:HardcodedAuthenticationService,
    private basicAuthService:BasicAuthenticationService,private DBservise:TodoDataService,private encryptService:EncrDecrServiceService) { }
  
  ngOnInit() {
  }
  handleJWTBasicAuthLogin(){
    this.invalidLogin=false;
    this.showProgress=true;
    this.doNotShowLoginForm=true;
    this.showSpinner=true;
    this.basicAuthService.excuteJWTAuthenticationService(null,this.password,this.username,null,"false").subscribe(
      data =>{
        const getDownloadProgress = () => {
          if (this.progress <= 251) {
            console.log(this.progress)
            this.progress = this.progress + 1;
            this.showProgress=true;
            this.doNotShowLoginForm=true;
           this.showSpinner=true;
          }
          else {
            clearInterval(this.intervalId);
            this.showProgress=false;
            this.doNotShowLoginForm=false;
            this.invalidLogin=false;
            this.showSpinner=false;
          }
        }
        this.router.navigate(['main',this.username])
        this.invalidLogin=false
      },
      error =>{
        this.showSpinner=false;
        this.doNotShowLoginForm=false;
        this.invalidLogin=true;
        this.username='';
        this.password='';
      }
    );
  }


  handleLoginThroughPHP(){
    this.invalidLogin=false;
    this.showProgress=true;
    this.doNotShowLoginForm=true;
    this.showSpinner=true;
    var encryptPassword = this.encryptService.testEncrypt(this.password);
    this.DBservise.getUserPHP(this.username,encryptPassword).subscribe(
      data =>{
        const getDownloadProgress = () => {
          if (this.progress <= 101) {
            sessionStorage.setItem('verifiedUser', JSON.parse(JSON.stringify(data)).user_name);
            sessionStorage.setItem('email', JSON.parse(JSON.stringify(data)).user_email);
            sessionStorage.setItem('phone', JSON.parse(JSON.stringify(data)).user_mobileno);
            sessionStorage.setItem('id',JSON.parse(JSON.stringify(data)).id);
            sessionStorage.setItem('pic_type',JSON.parse(JSON.stringify(data)).image_type);
            this.progress = this.progress + 1;
            this.showProgress=true;
            this.doNotShowLoginForm=true;
           this.showSpinner=true;
          }
          else {
            clearInterval(this.intervalId);
            this.showProgress=false;
            this.doNotShowLoginForm=false;
            this.invalidLogin=false;
            this.showSpinner=false;
            this.router.navigate(['main',JSON.parse(JSON.stringify(data)).user_name]);
          }
        }  
        this.intervalId = setInterval(getDownloadProgress, 9);
        this.invalidLogin=false
      },
      error =>{
        this.showSpinner=false;
        this.doNotShowLoginForm=false;
        this.invalidLogin=true;
        this.username='';
        this.password='';
      }
    );
    
  }

  handleLoginThroughMongoDB(){
    this.invalidLogin=false;
    this.showProgress=true;
    this.doNotShowLoginForm=true;
    this.showSpinner=true;
    var encryptPassword = this.encryptService.testEncrypt(this.password);
    this.DBservise.getUserMongoDB(this.username,encryptPassword).subscribe(
      data =>{
        const getDownloadProgress = () => {
          if (this.progress <= 101) {
            sessionStorage.setItem('verifiedUser', JSON.parse(JSON.stringify(data)).userName);
            sessionStorage.setItem('email', JSON.parse(JSON.stringify(data)).userEmail);
            sessionStorage.setItem('phone', JSON.parse(JSON.stringify(data)).userPhoneNumber);
            sessionStorage.setItem('id',JSON.parse(JSON.stringify(data))._id);
            this.progress = this.progress + 1;
            this.showProgress=true;
            this.doNotShowLoginForm=true;
           this.showSpinner=true;
          }
          else {
            clearInterval(this.intervalId);
            this.showProgress=false;
            this.doNotShowLoginForm=false;
            this.invalidLogin=false;
            this.showSpinner=false;
            this.router.navigate(['main',JSON.parse(JSON.stringify(data)).userName]);
          }
        }  
        this.intervalId = setInterval(getDownloadProgress, 9);
        this.invalidLogin=false
      },
      error =>{
        this.showSpinner=false;
        this.doNotShowLoginForm=false;
        this.invalidLogin=true;
        this.username='';
        this.password='';
      }
    );
    
  }

}
