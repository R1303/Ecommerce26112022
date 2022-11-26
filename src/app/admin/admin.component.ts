import { Component, OnInit } from '@angular/core';
import { MyOrder, Products } from '../list-todos/list-todos.component';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { TodoDataService } from '../service/data/todo-data.service';
//import { Products } from '../shop/shop.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 productArray:Products[]
 orderArray:MyOrder[]
 status="Confirmed"
 isPC:boolean;
  constructor(private service:TodoDataService,
    private basicAuthService:BasicAuthenticationService) { }

  ngOnInit() {
    this.isPC = this.basicAuthService.isPC();
    this.service.allProductonShopScreen().subscribe(
      response =>{
        this.productArray=response;
        if(this.productArray.length>0){
        }
      }
    );
    this.service.allOrderDetail().subscribe(
      response=>{
        this.orderArray=response;
        this.orderArray.sort((a, b) => new Date(b.orderedDate).getTime() - new Date(a.orderedDate).getTime());
      }
    )
    this.openPage('myProf', this, 'black');
  }

  deleteProduct(id){
    this.service.deleteProduct(id).subscribe(
      response=>{
        window.location.reload();
      }
    )
  }

  openPage(pageName, elmnt, color) {
    var i, tabcontent, tablinks;

    tabcontent = document.querySelectorAll('.tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = "none";
    }

    tablinks = document.querySelectorAll('.tablink');
    for (i = 0; i < tablinks.length; i++) {
      (tablinks[i] as HTMLElement).style.backgroundColor = color;
    }

    (document.querySelector("#" + pageName) as HTMLElement).style.display = "block";
    //(document.querySelector() as HTMLElement).style.backgroundColor = color;
    (document.querySelector("#defaultOpen") as HTMLElement).style.display = "block";
  }
  
  updateMyOrder:MyOrder
  showChangeModel(myOrder){
    this.updateMyOrder=myOrder;
    var address = document.querySelector('#updateStatus');
    console.log(address);
    (document.querySelector('.tabcontent') as HTMLElement).style.opacity = '0.4';
    var classname = (address as HTMLElement).style.display = "block";
  }
 
  disMissMadal(id) {
    console.log(id);
    (document.querySelector('.tabcontent') as HTMLElement).style.opacity = '1';
    (document.querySelector('#' + id) as HTMLElement).style.display = "none";
  }

  updateStatus(){
    this.updateMyOrder.status=this.status;
    this.disMissMadal('updateStatus');
    this.service.updateOrder(this.updateMyOrder).subscribe(
      response =>{
        //window.location.reload();
        
      }
    )
  }

}
