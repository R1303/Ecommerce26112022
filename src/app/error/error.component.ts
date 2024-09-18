import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private routerNavigate: Router) { }
  errorMsg="An Error Occured! Please Contact Support"
  ngOnInit() {
  }

  login(){
    this.routerNavigate.navigate(['login']);
}

}
