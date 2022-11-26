import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  username = ""
  constructor(public hardcodedAuthenticationService: BasicAuthenticationService,
    private router: Router) {
  }

  ngOnInit() {
    this.username = this.hardcodedAuthenticationService.getAuthorizedUser();
  }
  navigateToMyProfile() {
    (document.querySelector('#ftco-nav') as HTMLElement).style.display="none";
    this.username = this.hardcodedAuthenticationService.getAuthorizedUser();
      this.router.navigate(['welcome', this.username]);
  }
  
  clickLink(pageName){
    (document.querySelector('#ftco-nav') as HTMLElement).style.display="none";
    this.router.navigate([pageName]);
  }

  showMenu(){
    if((document.querySelector('#ftco-nav') as HTMLElement).style.display==="block"){
      (document.querySelector('#ftco-nav') as HTMLElement).style.display="none"
    }
    else{
      (document.querySelector('#ftco-nav') as HTMLElement).style.display="block"
    }
  }

}
