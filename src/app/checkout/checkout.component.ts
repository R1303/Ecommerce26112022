import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutDetail } from '../cart/cart.component';
import { Cart } from '../list-todos/list-todos.component';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkout:CheckoutDetail;
  total:number;
  name: string;
  phone:string;
  emaail:string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: number;
  subtotal: number;
  couponAmount: number;
  couponString: string;
  deliveryCharge: number; 
  showSpinner:boolean;
  isCouponApplied:boolean;
  isCashOnDelivery:boolean;
  cartArray:Cart[];
  constructor(private dataServide:TodoDataService,
    private authService:BasicAuthenticationService,
    private router:Router) { }

  ngOnInit() {
    this.isCashOnDelivery=false;
    this.showSpinner=true;
    this.phone=this.authService.getPhone();
    this.emaail=this.authService.getEmail();
    this.checkout=this.dataServide.getCheckOutDetail();
    this.name=this.checkout.name;
    this.line1=this.checkout.line1;
    this.line2=this.checkout.line2;
    this.city=this.checkout.city;
    this.state=this.checkout.state;
    this.pincode=this.checkout.pincode;
    this.subtotal=this.checkout.subtotal;
    this.couponAmount=this.checkout.couponAmount;
    this.couponString=this.checkout.couponString;
    this.deliveryCharge=this.checkout.deliveryCharge;
    this.total=(this.subtotal+this.deliveryCharge)-this.couponAmount;
    this.isCouponApplied=this.checkout.isCouponApplied;
    
    if(this.name!=null){
    this.showSpinner=false;
    }
  }
   
  setIsCashOnDelivery(){
    this.isCashOnDelivery=true;
  }
  getOtp(){
    //alert(this.isCashOnDelivery)
    this.showSpinner=true;
    if(this.isCashOnDelivery){
    (document.querySelector('#orderButton') as HTMLElement).style.display="none";
    (document.querySelector('#orderButtonDisabled') as HTMLElement).style.display="block";
    // this.dataServide.getOtp(this.authService.getPhone()).subscribe(
    //   response =>{
    //     this.router.navigate(['verifyUser']);
        
    //   }
    // )
    this.dataServide.getCartDetailMongoDB(this.authService.getUserID()).subscribe(
      response =>{
        this.cartArray=response;
        for(var i=0;i<this.cartArray.length;i++){
          this.addOrder(this.cartArray[i]);
          this.deleteCartItem(this.cartArray[i].id);
        }
      }
    )
  }
}
addOrder(cart){
  this.dataServide.setOrderDetailMongoDB(cart,this.dataServide.getCheckOutDetail()).subscribe(
    response =>{
     this.router.navigate(['placeOrder']);
    }
  ) 
}

deleteCartItem(id){
  this.dataServide.deleteCartItemMongoDB(id).subscribe(
    response=>{

    }
  )
}

}
