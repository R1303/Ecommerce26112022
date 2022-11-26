import { Component, OnInit } from '@angular/core';
import { Products } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {
  productArray:Products[]
  //products:Products;
  showScreen:boolean
  showSpinner:boolean
  isPC:boolean;
  category:string;
  constructor(private service:TodoDataService,
    private router:Router,
    private route:ActivatedRoute) { }
 
  ngOnInit() {
    this.showSpinner=true;
    var userAgent = window.navigator.userAgent;
    this.isPC = userAgent.search('Android') === -1;
    this.category = this.route.snapshot.params['category'];
    if(this.category==null){
    this.service.allProductonShopScreen().subscribe(
      response =>{
        this.productArray=response;
        if(this.productArray.length>0){
          this.showSpinner=false;
          this.showScreen=true;
        }
      }
    )
    }
    else{
      this.service.getProductByCategoryPHP(this.category).subscribe(
        response=>{
          this.productArray=response;
          if(this.productArray.length>0){
            this.showSpinner=false;
            this.showScreen=true;
          }
        }
      )
    }
    if(this.isPC){
      //this.changeClass();
    }    
  }

  changeClass(){
    var productClass = document.querySelectorAll(".list-inline-item").item(0);
    productClass.className.replace("list-inline-item", "col-lg-4 col-md-6 list-inline-item");
  }

  navigateToSingleProduct(id){
    this.router.navigate(['singleProduct',id]);
  }

}


// export class Products {
//   public static id:number;
//      public static productName : string;
//      public static productPrice:number;
//      public static description:string;
//      public static category:string;
//      public static productImage1:string;
//      public static productImage2:string;
//      public static productImage3:string; 
//   constructor(
//      public id:number,
//      public productName : string,
//      public productPrice:number,
//      public description:string,
//      public category:string,
//      public productImage1:string,
//      public productImage2:string,
//      public productImage3:string, 
//   ){
//     this.productPrice=productPrice;
// }
//}

