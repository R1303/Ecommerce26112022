import { Attribute, Component, OnInit } from '@angular/core';
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
  btnValue:string;
  saveCartData:Cart;
  constructor(private authService:BasicAuthenticationService,
    private todoService:TodoDataService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.showSpinner=true;
    var userAgent = window.navigator.userAgent;
    this.isPC = userAgent.search('Android') === -1;
    this.id = this.route.snapshot.params['id'];
    this.isUserLoggedIn=this.authService.isUserLoggedIn();
    if(this.isUserLoggedIn==false){
      this.btnValue = "Login"; 
    }
    this.todoService.ProductByIdMongoDB(this.id).subscribe(
      response =>{
        this.product=response[0];
        this.productName=this.product.productName;
        this.productImage1=this.product.productImage1;
        this.productImage2=this.product.productImage2;
        this.productImage3=this.product.productImage3;
        this.productPrice=this.product.productPrice;
        this.description=this.product.description;
        this.showSpinner=false;
        if(this.isUserLoggedIn){
        this.todoService.getCartDetailByProductMongoDB(this.product.id,this.authService.getUserID()).subscribe(
          response => {
              this.cartArray=response;
              if(this.cartArray!=null && this.cartArray.length>0){
                this.isItemExistInCart=true;
                this.btnValue = "Update Cart";
              }
          }
        );
        }
        this.todoService.getProductByCategoryMongoDB(this.product.category).subscribe(
          response=>{
            this.categoryProduct=response;
            this.categoryProduct=this.categoryProduct.filter(x=>x.id!=this.product.id);
          }
        );
        this.showSpinner=false;
        this.showScreen=true;
      }
    );
    if(this.isUserLoggedIn==true){
      this.btnValue = "Add To Cart"; 
    }
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
  var value=(quantity as HTMLElement).attributes.getNamedItem("value").value
  if(value=='1'){
    alert("Minimum value 1");
  }
  else{
    
    var qu=parseInt(value);
    this.productQuantity=qu-1;
    (quantity as HTMLElement).setAttribute("value",qu-1+"");
  }
}

plusButton(){
  var quantity=document.querySelector("#quantity");
    var value=(quantity as HTMLElement).attributes.getNamedItem("value").value
    //console.log((quantity as HTMLElement).attributes.getNamedItem("value").value);
    var qu=parseInt(value);
    this.productQuantity=qu+1;
    (quantity as HTMLElement).setAttribute("value",qu+1+"");
  
}
navigateToSingleProduct(id){
  this.router.navigate(['singleProduct',id]);
  this.ngOnInit();
}
addToCart(){
  this.showSpinner=false;
  if(this.isItemExistInCart){
    var cart=this.cartArray[0];
    var cartQuantity=cart.quantity.toString();
    cart.quantity=Number.parseFloat(cartQuantity)+this.productQuantity;
    cart.total=cart.product_price*cart.quantity;
  
    this.todoService.UpdateCartMongoDB(this.authService.getUserID(),cart).subscribe(
      response =>{
        this.router.navigate(["cart"]);
      }
    )
  }
  else{
    var total = (this.product.productPrice*this.productQuantity);
    this.saveCartData=new Cart(this.product.id,this.product.productImage1,this.product.productName
      ,this.product.productPrice,this.productQuantity,total,this.authService.getUserID(),this.product.id.toString())
  this.todoService.saveCartMongoDB(this.saveCartData).subscribe(
    response =>{
      this.router.navigate(["cart"]);
    }
  )
  }
}

}
