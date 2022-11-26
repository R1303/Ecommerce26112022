import { Component, OnInit } from '@angular/core';
import { Products } from '../list-todos/list-todos.component';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { TodoDataService } from '../service/data/todo-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../list-todos/list-todos.component';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  product:Products;
  isUserLoggedIn:boolean;
  id:any
  showSpinner:boolean
  showScreen:boolean
  productImage1:string;
  productImage2:string;
  productImage3:string;
  productPrice:number;
  description:string;
  productName:string;
  slideIndex = 1;
  isPC:boolean;
  productQuantity=1;
  cartArray:Cart[];
  categoryProduct:Products[];
  isItemExistInCart:boolean;
  constructor(private authService:BasicAuthenticationService,
    private todoService:TodoDataService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.showSpinner=true;
    var userAgent = window.navigator.userAgent;
    this.isPC = userAgent.search('Android') === -1;
    this.id = this.route.snapshot.params['id'];
    this.isUserLoggedIn=this.authService.isUserLoggedIn();
    this.todoService.ProductByIdPHP(this.id).subscribe(
      response =>{
        this.product=response[0];
        this.productName=this.product.productName;
        this.productImage1=this.product.productImage1;
        this.productImage2=this.product.productImage2;
        this.productImage3=this.product.productImage3;
        this.productPrice=this.product.productPrice;
        this.description=this.product.description;
        if(this.isUserLoggedIn){
        this.todoService.getCartDetailByProductPHP(this.product.id,this.authService.getUserID()).subscribe(
          response => {
              this.cartArray=response;
              if(this.cartArray!=null && this.cartArray.length>0){
                this.isItemExistInCart=true;
              }
          }
        );
        }
        this.todoService.getProductByCategoryPHP(this.product.category).subscribe(
          response=>{
            this.categoryProduct=response;
          }
        );
        this.showSpinner=false;
        this.showScreen=true;
      }
    );
    this.showDivs(this.slideIndex);
  }

plusDivs(n) {
  this.showDivs(this.slideIndex += n);
}

currentDiv(n) {
  this.showDivs(this.slideIndex = n);
}

showDivs(n) {
  var i;
  var x = document.querySelectorAll(".mySlides");
  var dots = document.querySelectorAll(".demo");
  if (n > x.length) {this.slideIndex = 1}
  if (n < 1) {this.slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    (x[i] as HTMLElement).style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  var index=x[this.slideIndex-1]; 
  var dotIndex=dots[this.slideIndex-1];
  (index as HTMLElement).style.display = "block"; 
  if(!this.isPC){
    (index as HTMLElement).style.height="200px";
  } 
  (dotIndex as HTMLElement).className += " w3-white";
}

minusButton(){
  var quantity=document.querySelector("#quantity");
  if((quantity as HTMLElement).attributes.item(8).value=='1'){
    alert("Minimum value 1");
  }
  else{
    var value=(quantity as HTMLElement).attributes.item(8).value
    var qu=parseInt(value);
    this.productQuantity=qu-1;
    (quantity as HTMLElement).attributes.item(8).value=qu-1+"";
  }
}

plusButton(){
  var quantity=document.querySelector("#quantity");
    var value=(quantity as HTMLElement).attributes.item(8).value
    var qu=parseInt(value);
    this.productQuantity=qu+1;
    (quantity as HTMLElement).attributes.item(8).value=qu+1+"";
  
}

addToCart(){
  this.showSpinner=true;
  if(this.isItemExistInCart){
    var cart=this.cartArray[0];
    var cartQuantity=cart.quantity.toString();
    cart.quantity=Number.parseFloat(cartQuantity)+this.productQuantity;
    cart.total=cart.product_price*cart.quantity;
  
    this.todoService.UpdateCartPHP(this.authService.getUserID(),cart).subscribe(
      response =>{
        this.router.navigate(["cart"]);
      }
    )
  }
  else{
  this.todoService.saveCartPHP(this.product,this.productQuantity,this.authService.getUserID()).subscribe(
    response =>{
      this.router.navigate(["cart"]);
    }
  )
  }
}

}
