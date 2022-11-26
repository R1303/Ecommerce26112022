import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor() { }

   
  showSpinner=true;
  ngOnInit() {
    this.showSpinner=false;
    this.resetPosition();
  }

  
  resetPosition() {
    let myDiv = document.getElementById("detail");
    (myDiv as HTMLElement).scrollTop = 0;
  }


}
