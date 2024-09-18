import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyOrder } from '../list-todos/list-todos.component';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { TodoDataService } from '../service/data/todo-data.service';
import { EncrDecrServiceService } from '../service/encr-decr-service.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  showSpinner: boolean;
  productArray: MyOrder[];
  isPC: boolean;
  isItemPresent:boolean;
  constructor(private dataService:TodoDataService,
    private authService:BasicAuthenticationService,
    private router:Router,
    private encryptService:EncrDecrServiceService) { }

  ngOnInit() {
    this.showSpinner=true;
    this.isItemPresent=false;
    var userAgent = window.navigator.userAgent;
    this.isPC = this.authService.isPC();
    this.dataService.getOrderDetailMongoDB(this.authService.getUserID()).subscribe(
      response=>{
        this.productArray=response;
        this.productArray.sort((a, b) => new Date(b.orderedDate).getTime() - new Date(a.orderedDate).getTime());
        if(this.productArray.length>0){
          this.isItemPresent=true;
        }
        this.showSpinner=false;
      }
    )
  }
  navigateToSingleProduct(id){
    this.router.navigate(['orderDetail',id]);
  }

}
