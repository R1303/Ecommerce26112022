import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address, User } from '../list-todos/list-todos.component';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { TodoDataService } from '../service/data/todo-data.service';
import { WelcomeDataService } from '../service/data/welcome-data.service';
import { Subscription, timer } from 'rxjs';
import { abort, exit } from 'process';
import * as MobileDetect from 'mobile-detect';

@Component({
  selector: 'app-all-address',
  templateUrl: './all-address.component.html',
  styleUrls: ['./all-address.component.css']
})
export class AllAddressComponent implements OnInit {
  email: string
  phone: string
  User: User;
  progress = 0;
  intervalId;
  showScreen: boolean;
  showProgress = false;
  isPC: boolean;
  addressArray: Address[];
  updateAddressArray: Address[];
  address: Address;
  showAddress: boolean;
  isMoreAddress: boolean;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: number;
  addressId: number;
  dummyAddress: Address;
  showSpinner: boolean;
  isAdmin: boolean;
  selectedAddress: Address;
  showAlert:boolean;
  alertMsg:string;
  constructor(private route: ActivatedRoute,
    private todoService: TodoDataService,
    private basicAuthService: BasicAuthenticationService) { }

  ngOnInit() {
    this.User = this.basicAuthService.getUserById();
    var userAgent = window.navigator.userAgent;
    var md = new MobileDetect(userAgent);
    this.isPC = md.mobile()==null; 
    this.isAdmin = this.basicAuthService.isAdmin();
    this.onPageLoad();
    const getDownloadProgress = () => {
      if (this.progress <= 55) {
        this.progress = this.progress + 1;
        this.showSpinner = true;
      }
      else {
        this.showScreen = true;
        this.showSpinner = false;
        clearInterval(this.intervalId);
      }
    }
    this.intervalId = setInterval(getDownloadProgress, 20);
  }

  onPageLoad(){
    this.todoService.getAddressUsingUserIDMongoDB(sessionStorage.getItem('id')).subscribe(
      response => {
        this.addressArray = response;
        if (this.addressArray.length > 0) {
          this.showAddress = true;
          this.address = this.addressArray[this.addressArray.length - 1];
         // alert(this.address.address_type!="null");
        }
        if (this.addressArray.length > 1) {
          this.isMoreAddress = true;
        }
      }
    );
  }

  selectAddressHit(id) {
    for (var i = 0; i < this.addressArray.length; i++) {
      var address = this.addressArray[i];
      if (address._id == id) {
        this.selectedAddress = address;
        console.log(this.selectedAddress);
        this.line1 = this.selectedAddress.address_line_1;
        this.line2 = this.selectedAddress.address_line_2;
        this.city = this.selectedAddress.city;
        this.state = this.selectedAddress.state;
        this.pincode = this.selectedAddress.pincode;
        this.selectedAddress.address_type = "default";
      }
    }
  }
  
  makeDefault(id) {
    this.showSpinner=true;
    this.selectAddressHit(id);
    if (this.selectedAddress != null) {
      this.todoService.UpdateAddressMongoDB(sessionStorage.getItem('id'), this.selectedAddress).subscribe(
        response => {
          this.showAlertPopup("Address Successfull Updated !!");
          this.updateAddressArray = this.addressArray.filter(x=>x._id!=id);
          this.updateAddressArray.forEach(element => {
            element.address_type = "null";
            this.todoService.UpdateAddressMongoDB(sessionStorage.getItem('id'),element).subscribe();
          });
        }
      );
    }
    else {
      alert("Please Select an Address")
    }
    this.showSpinner=false;
  }

  deleteAddress(id){
    this.todoService.deleteAddress(id).subscribe(
      response=>{
        this.showAlertPopup("Address Successfully Deleted !!");
        this.onPageLoad();
      }
    );
  }

  showAlertPopup(message) {
    const source = timer(1000,1000);
    const abc = source.subscribe(val => {
      if(val==1){
        abc.unsubscribe();
        this.showAlert=false;
      }
      else{
        this.onPageLoad();
        this.showAlert=true;
        this.alertMsg=message;
      }
    });
  }

}


