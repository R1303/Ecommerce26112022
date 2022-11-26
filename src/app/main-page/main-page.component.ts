import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { GetUrlDetail, HomePage, Products } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';
import { EncrDecrServiceService } from '../service/encr-decr-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  slideIndex = 0;
  count=0;
  isPC:boolean;
  productArray:Products[];
  homePage:HomePage;
  showSpinner:boolean;
  header_image:String;
  Imagedata:String[];
  startIndex:number;
  constructor(private service:TodoDataService,
    private router:Router,
    private encryptService:EncrDecrServiceService) { }

  ngOnInit() {
    this.Imagedata=["../assets/images/bg_1 - Copy.jpg","../assets/images/bg_2 - Copy.jpg","../assets/images/bg_3 - Copy.jpg"]
    var userAgent = window.navigator.userAgent;
    this.isPC=userAgent.search('Android')===-1;
    var key=this.encryptService.testEncrypt("verifiedUser");
    this.service.homePageDetail().subscribe(
      response=>{
        this.homePage=response[0];
        this.header_image=this.homePage.header_image;
      }
    )
    this.service.allProductonShopScreen().subscribe(
      response =>{
        this.productArray=response;
        console.log(this.productArray[0]);
        if(this.productArray.length>0 && this.header_image!=null){
           this.showSpinner=false;
        }
      }
    )
}

shopByCategory(category){
  this.router.navigate(["shop",category]);
}

navigateToSingleProduct(id){
  this.router.navigate(['singleProduct',id]);
}

@ViewChild('videoPlayer') videoplayer: ElementRef;
toggleVideo(event: any) {
  this.videoplayer.nativeElement.play();
}
@ViewChild('downloadZipLink') private downloadZipLink: ElementRef;
downloadUrl:any
fileName:any
videoPresent:boolean
download(){
  var get=new GetUrlDetail("https://www.instagram.com/p/CGeYX2OA61s/");
  this.service.getUrlData(get).subscribe(
    response=>{
      console.log(response);
      const classArr: any = document.querySelectorAll('.download-zip-link');
      var link=classArr[0] as HTMLElement;
      this.fileName="file.mp4";
      this.downloadUrl=response;
      link.setAttribute("download",this.fileName);
      link.setAttribute("href",this.downloadUrl); 
      this.videoPresent=true;
      window.URL.revokeObjectURL(this.downloadUrl);
    }
  )
}



Repeat() {
  setTimeout(() => {
    this.__FunctionSlide();
    this.Repeat();
  }, 2000);
}

__FunctionSlide() {
  this.startIndex = 0;
  alert(this.startIndex)
  const slides = Array.from(document.getElementsByClassName('mall-show-slide'));
  if (slides === []) {
    this.Repeat();
  }
  for (const x of slides) {
    const y = x as HTMLElement;
    y.style.display = 'none';
  }
  if (this.startIndex > slides.length - 1) {
    this.startIndex = 0;
    const slide = slides[this.startIndex] as HTMLElement;
    slide.style.display = 'block';
    this.startIndex++;
  } else {
    const slide = slides[this.startIndex] as HTMLElement;
    slide.style.display = 'block';
    this.startIndex+1;
  }
}


}
