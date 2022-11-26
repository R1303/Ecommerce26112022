import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../list-todos/list-todos.component';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User
  userName: string;
  userEmail: string;
  userPassword: string;
  userPhoneNumber: string;
  id = -1;
  isValid: boolean;
  showRegister: boolean;
  showForm: boolean;
  errorMsg = "Something Went Wrong, Please Try Again !!";

  progress = 0;
  progressBar = document.querySelector('.progress-bar');
  intervalId;
  showRegisterPopup: boolean;
  isResponse: boolean;
  showSpinner:boolean;
  constructor(private todoService: TodoDataService,
    private router: ActivatedRoute,
    private routerNavigate: Router,
    private authenticateUser: BasicAuthenticationService) { }

  ngOnInit() {

  }

  saveTodo() {
    this.showRegister = true;
    this.user = new User(this.id, this.userName, this.userEmail, this.userPhoneNumber, this.userPassword,'null');
    this.addThroughPhp(this.user);
    const getDownloadProgress = () => {
      if (this.progress <= 110) {
        // console.log(this.progress);
        this.progress = this.progress + 1;
        this.showRegisterPopup = false
        this.showSpinner=true;
      }
      else {
        clearInterval(this.intervalId);
        this.showRegisterPopup = true;
        this.showRegister = false;
        if (this.showRegisterPopup && !this.isValid) {
          this.showForm = true;
        }
        this.showSpinner=false;
        if(this.isValid==true){
        this.routerNavigate.navigate(['main', this.userName]);
        }
      }
    }
    this.intervalId = setInterval(getDownloadProgress, 29);


  }

  addThroughPhp(user){
    this.todoService.addTodo(user).subscribe(
      data => {
        if(data=="User Already Exist"){
          this.errorMsg = "User Already Exist !!"
          this.isValid = false;
          this.isResponse = true;
          this.showSpinner=false;
        }
        else {
        this.isValid = true;
        this.isResponse = true;
        this.authenticateUser.setAuthorizedUser(this.userName);
        sessionStorage.setItem('verifiedUser', this.userName);  
        sessionStorage.setItem('email', JSON.parse(JSON.stringify(data)).user_email);
        sessionStorage.setItem('phone', JSON.parse(JSON.stringify(data)).user_mobileno);
        sessionStorage.setItem('id',JSON.parse(JSON.stringify(data)).id);
      }
      },
      error =>{
       console.log(error);
      }
    );
  }
  addTodo() {
    
    this.authenticateUserDetail();

  }

  loginHere() {
    this.routerNavigate.navigate(['main', this.userName]);
  }

  authenticateUserDetail() {
    this.authenticateUser.logout();
    this.authenticateUser.excuteJWTAuthenticationService(this.userName, this.userPassword, this.userEmail, this.userPhoneNumber, "true").subscribe(
      data => {
        if (this.authenticateUser.getAuthorizedToken() == "Bearer User Already Present") {
          this.errorMsg = "User Name or Email Already Present !!";
          console.log((this.authenticateUser.getAuthorizedToken()));
          this.isValid = false;
          this.isResponse = true;
          this.showSpinner=false;
        }
        else {
          this.isValid = true;
          this.isResponse = true;
        }
      },
      error => {
        this.isValid = false;
        this.isResponse = true;
      }
    )
  }

  refresh() {
    window.location.reload();
  }
}
