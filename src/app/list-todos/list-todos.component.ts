import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Binary } from '@angular/compiler';
export class Todo {
  constructor(
     public id:number,
     public description : string,
     public done:boolean,
     public targetDate:Date
  ){
  }
}
export class GetUrlDetail {
  constructor(
     public url : string
  ){
  }
}
export class ResponseMessgae {
  constructor(
     public status : string
  ){
  }
}
export class HomePage {
  static id:number;
  static header_image : string;
  static category_image_1:string;
  static category_image_2:string;
  static category_image_3:string;
  static category_image_4:string;
  static offer_detail_image:string;
  static offer_detail_text:string;
  static offer_detail_price:string;
  constructor(
    public id:number,
    public header_image : string,
    public category_image_1:string,
    public category_image_2:string,
    public category_image_3:string,
    public category_image_4:string,
    public offer_detail_image:string,
    public offer_detail_text:string,
    public offer_detail_price:string
  ){
  }
}
export class User {
  static  id:number;
  static userName : string;
  static userEmail:string;
  static userPhoneNumber:string;
  static userPassword:string;
  static user_image:string;
  constructor(
     public  id:number,
     public userName : string,
     public userEmail:string,
     public userPhoneNumber:string,
     public userPassword:string,
     public user_image:string
  ){
  }
}
export class Address {
  constructor(
     public _id:number,
     public address_line_1 : string,
     public address_line_2:string,
     public city:string,
     public state:string,
     public pincode:number,
     public userId:string,
     public address_type:string
  ){
  }
}
export class Product {
  constructor(
     public id:number,
     public productName : string,
     public productPrice:number,
     public description:string,
     public category:string
    
  ){
  }
}
export class Products {
  constructor(
     public id:number,
     public productName : string,
     public productPrice:number,
     public description:string,
     public category:string,
     public productImage1:string,
     public productImage2:string,
     public productImage3:string,
    
  ){
  }
}

export class Cart {
  constructor(
     public id:number,
     public product_image1:string,
     public product_name : string,
     public product_price:number,
     public quantity:number,
     public total:number,
     public fk_user:string,
     public fk_product:string,
  ){
  }
}
export class MyOrder {
  constructor(
     public id:number,
     public productImage1:string,
     public productName : string,
     public productPrice:number,
     public quantity:number,
     public total:number,
     public userFk:string,
     public productFk:string,
     public line1 : string,
     public line2:string,
     public city:string,
     public state:string,
     public pincode:number,
     public status:string,
     public orderedDate:string,
     public expectedDate:string
  ){
  }
}
@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  
  todos : Todo[];
  users:User[];
  deleteMsg:string
  constructor() { }

  ngOnInit() {
    //this.refreshTodos();
    }
  

//  refreshTodos(){
//   this.serviceTodos.reteriveAllUsers('Rajan Rana').subscribe(
//     response => {
//       this.users=response;
//     }
//   );
// }

// deleteTodos(id){
//   this.serviceTodos.deleteTodos(id).subscribe(
//     response =>{
//        this.deleteMsg=`Todo of ${id} Successfully Deleted !`
//        this.refreshTodos();
//     }
//   )
// }

// updateTodo(id){
//   this.router.navigate(['todo',id])
// }

// addTodo(){
//   this.router.navigate(['todo',-1])
// }

}
