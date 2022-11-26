import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Cart, Products, Address } from '../list-todos/list-todos.component';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  showSpinner: boolean;
  productArray: Cart[];
  isPC: boolean;
  deliveryCharges: number;
  subTotal: number;
  couponAmount: number;
  couponCode: string;
  isAvailable: boolean;
  totalAmount: number;
  isNotValidCoupon: boolean;
  addressArray: Address[];
  selectedAddress: Address;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: number;
  checkboxModel: boolean;
  isItemPresent:boolean;
  isCouponApplied:boolean;
  grossAmmount:number;
  addressNotPresent:boolean;
  cartData:Cart;
  constructor(private dataService: TodoDataService,
    private authService: BasicAuthenticationService,
    private router:Router) { }

  ngOnInit() {
    this.showSpinner = true;
    this.deliveryCharges = 0.0;
    this.couponAmount = 0.0;
    this.totalAmount = 0.0;
    this.grossAmmount=0.0;
    var userAgent = window.navigator.userAgent;
    this.isPC = userAgent.search('Android') === -1; 
    this.dataService.getCartDetailPHP(this.authService.getUserID()).subscribe(
      response => {
        this.productArray = response;
        if(this.productArray.length>0){
          this.showSpinner = false;
          this.totalAmount = (this.subTotal + this.deliveryCharges) - this.couponAmount; 
          this.isItemPresent=true;
        }
        else{
          this.isItemPresent=false;
        }
        this.getTotal();
      }
    );
    this.onPageAddressLoad();
    
  }


  onPageAddressLoad(){
    this.dataService.getAddressUsingUserIDPHP(this.authService.getUserID()).subscribe(
      response => {
        this.addressArray = response;
        if (this.addressArray.length > 0) {
          for (var i = 0; i < this.addressArray.length; i++) {
            if (this.addressArray[i].address_type == "default") {
              //alert(this.addressArray[i].address_type)
              this.selectedAddress = this.addressArray[i];
              this.line1 = this.selectedAddress.address_line_1;
              this.line2 = this.selectedAddress.address_line_2;
              this.city = this.selectedAddress.city;
              this.state = this.selectedAddress.state;
              this.pincode = this.selectedAddress.pincode;
            }
            if(this.selectedAddress==null){
              if(i==this.addressArray.length-1 && this.addressArray[i].address_type != "default"){
              this.selectedAddress = this.addressArray[i];
              this.line1 = this.selectedAddress.address_line_1;
              this.line2 = this.selectedAddress.address_line_2;
              this.city = this.selectedAddress.city;
              this.state = this.selectedAddress.state;
              this.pincode = this.selectedAddress.pincode;
              }
            }
            this.getTotal();
            this.showSpinner = false;
          }
        }
         else{
          this.getTotal();
           this.showSpinner=false;
           this.addressNotPresent=true;
         }
      }
    );
  }

  getTotal() {
    this.subTotal=0;
    if(this.isItemPresent)
    {
    for (var i = 0; i < this.productArray.length; i++) {
      this.cartData = this.productArray[i];
      var total =  this.cartData.total.toString();
      this.subTotal = (this.subTotal)+(Number.parseFloat(total));
    }
    this.estimate();
  }
  }

  calculateCoupon() {
    if (this.couponCode == "test10") {
      this.isNotValidCoupon = false;
      this.isCouponApplied=true;
      this.couponAmount = (((this.subTotal) * 10) / 100);
    }
    else {
      this.isNotValidCoupon = true;
      this.couponAmount;
    }
    if (this.couponCode == null) {
      this.isNotValidCoupon = false;
    }
    this.grossAmmount= this.subTotal + this.deliveryCharges;
    this.totalAmount = (this.subTotal + this.deliveryCharges) - this.couponAmount;
  }
  estimate() {
    this.deliveryCharges;

    if (this.pincode != null) {
      if (this.pincode == 251314) {
        this.deliveryCharges = 20;
        this.isAvailable = true;
      }
      else {
        this.deliveryCharges=0;
        this.isAvailable = false;
      }
    }
    this.totalAmount = (this.subTotal + this.deliveryCharges) - this.couponAmount;
  }
  checkAvailability() {
    if (this.selectedAddress != null) {
      if (this.selectedAddress.pincode == 251314) {
        return true;
      }
      if (this.selectedAddress.pincode == null) {
        return true;
      }
    }
    return false;
  }
  showModal(id) {
    var address = document.querySelector('#' + id);
    console.log(address);
    (document.querySelector('.ftco-cart') as HTMLElement).style.opacity = '0.4';
    var classname = (address as HTMLElement).style.display = "block";

  }
  disMissMadal(id) {
    console.log(id);
    (document.querySelector('.ftco-cart') as HTMLElement).style.opacity = '1';
    (document.querySelector('#' + id) as HTMLElement).style.display = "none";
  }
  selectAddressHit(id) {
    for (var i = 0; i < this.addressArray.length; i++) {
      var address = this.addressArray[i];
      if (address.address_id == id) {
        this.selectedAddress = address;

        this.line1 = this.selectedAddress.address_line_1;
        this.line2 = this.selectedAddress.address_line_2;
        this.city = this.selectedAddress.city;
        this.state = this.selectedAddress.state;
        this.pincode = this.selectedAddress.pincode;
        this.selectedAddress.address_type = "default";
        this.dataService.UpdateAddressPHP(this.authService.getUserID(), this.selectedAddress).subscribe(
          response => {
            console.log("Address Updated");
            this.onPageAddressLoad();
          }
        );
        this.disMissMadal('SelectAddress');
      }
    }
    this.estimate();
    //window.location.reload();
  }

  CheckBox_Checked(selectedId) {
    this.checkboxModel = false;
    this.showSpinner=true;
    for (var i = 0; i < this.addressArray.length; i++) {
      //this.addressArray[i].selected = false;
      if (this.addressArray[i].address_id != selectedId) {
        //this.addressArray[i].selected = false;
      }
    }
    this.selectAddressHit(selectedId);
    this.showSpinner=false
  }

  deleteCartItem(id){
    this.showSpinner=true;
    this.dataService.deleteCartItemPHP(id).subscribe(
      response=>{
        this.ngOnInit();
         //window.location.reload();          
      }
    )
  }
  addAddress(){
    this.router.navigate(['welcome', this.authService.getAuthorizedUser()]);
  }
  navigateToSingleProduct(id){
    this.router.navigate(['singleProduct',id]);
  }

  navigateToCheckOut(){
    this.showSpinner=true;
    var ceckoutDetail=new CheckoutDetail(this.authService.getAuthorizedUser(),
    this.selectedAddress.address_line_1,this.selectedAddress.address_line_2,this.selectedAddress.city,
    this.selectedAddress.state,this.selectedAddress.pincode,this.subTotal,this.couponAmount,this.couponCode,
    this.deliveryCharges,this.isCouponApplied,"confirmed");
    this.dataService.setCheckOutDetail(ceckoutDetail);
    this.router.navigate(['checkout']);
  }

  shop(){
    this.router.navigate(['shop']);
}
allAddress(){
  this.router.navigate(['allAddress']);
}

}

export class CheckoutDetail {
   name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: number;
  subtotal: number;
  couponAmount: number;
  couponString: string;
  deliveryCharge: number; 
  isCouponApplied:boolean;
  status:string;
  constructor(name: string,
  line1: string,
  line2: string,
  city: string,
  state: string,
  pincode: number,
  subtotal: number,
  couponAmount: number,
  couponString: string,
  deliveryCharge: number,
  isCouponApplied:boolean,
  status:string
  ) {
    this.name=name;
    this.line1=line1;
    this.line2=line2;
    this.city=city;
    this.state=state;
    this.pincode=pincode;
    this.subtotal=subtotal;
    this.couponAmount=couponAmount;
    this.couponString=couponString;
    this.deliveryCharge=deliveryCharge;
    this.isCouponApplied=isCouponApplied;
    this.status=status;
  }

}
