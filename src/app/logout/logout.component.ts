import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private basicAuthService: BasicAuthenticationService,
    private routerNavigate: Router) { }

  ngOnInit() {
    this.basicAuthService.logout();
  }


  login() {
    this.routerNavigate.navigate(['login']);
  }

}
