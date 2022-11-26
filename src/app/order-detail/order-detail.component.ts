import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyOrder } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  isPC:boolean
  myOrder:MyOrder
  id:any
  showSpinner:boolean
  quantity:number
  totalPrice:number
  image1:string
  isConfirmed:boolean
  isShipped:boolean
  isOnRoute:boolean
  isDelivered:boolean
  addressLine1:string
  addressLine2:string
  city:string
  pincode:number
  expectedDate:String
  productName:string
  constructor(private service:TodoDataService,
    private route:ActivatedRoute,
    public datepipe: DatePipe) { }

  ngOnInit() {
    this.showSpinner=true;
    var userAgent = window.navigator.userAgent;
    this.isPC = userAgent.search('Android') === -1;
    this.id = this.route.snapshot.params['id'];
    this.service.getOrderDetailByIdPHP(this.id).subscribe(
      response => {
             this.myOrder=response[0];
             this.fillData();
             this.showSpinner=false;
      },
      error =>{
        this.showSpinner=false;
      }
    )
   
  }
  fillData(){
    this.quantity=this.myOrder.quantity;
    this.totalPrice=this.myOrder.total;
    this.image1=this.myOrder.product_image1;
    this.addressLine1=this.myOrder.address_line_1;
    this.addressLine2=this.myOrder.address_line_2;
    this.city=this.myOrder.city;
    this.pincode=this.myOrder.pincode;
    this.expectedDate=this.datepipe.transform(this.myOrder.expected_date,"dd/MM/yyyy");
    this.productName=this.myOrder.product_name;
    if(this.myOrder.status=="confirmed"||this.myOrder.status=="Confirmed"){
      this.isConfirmed=true;
    }
    else if(this.myOrder.status=="shipped"||this.myOrder.status=="Shipped"){
      this.isShipped=true;
    }
    else if(this.myOrder.status=="onRoute"||this.myOrder.status=="OnRoute"){
     this.isOnRoute=true;
    }
    else if(this.myOrder.status=="delivered"||this.myOrder.status=="Delivered"){
      this.isDelivered=true;
    }
  }

}
