import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  progress = 0;
  constructor() { }
  progressBar = document.querySelector('.progress-bar');
  intervalId;
  showPage:boolean;
  showSpinner:boolean;
  ngOnInit() {
    const getDownloadProgress = () => {
      if (this.progress <= 99) {
        this.progress = this.progress + 1;
        this.showPage=false;
        this.showSpinner=true;
      }
      else {
        clearInterval(this.intervalId);
        this.showPage=true;
        this.showSpinner=false;
      }
    }
    this.intervalId = setInterval(getDownloadProgress,15);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  resetPosition(_event: any) {
    let myDiv = document.getElementById("detail");
    (myDiv as HTMLElement).scrollTop = 0;
  }
}
