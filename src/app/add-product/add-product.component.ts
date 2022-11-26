import { Component, OnInit } from '@angular/core';
import { Product } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  selectedFile: File
  selectedFile1: File
  selectedFile2: File
  productName:string
  productPrice:string
  description:string
  category:string
  dummyProduct:Product
  id=0
  status:any
  showSpinner:boolean;
  disableAddBtn:boolean;
  constructor(private todoService:TodoDataService,private router:Router) { }

  ngOnInit() {
    //this.showSpinner=true;
    this.category="Fruits";
   //this.showSpinner=false;
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  public onFileChanged1(event) {
    this.selectedFile1 = event.target.files[0];
  }
  public onFileChanged2(event) {
    this.selectedFile2 = event.target.files[0];
  }

  uploadData(){
   const uploadImageData = new FormData();
   const uploadImageData1 = new FormData();
   const uploadImageData2 = new FormData();
   this.dummyProduct=new Product(this.id,this.productName,(Number(this.productPrice)),this.description,this.category);
   if(this.valiidateData()===false && this.selectedFile===undefined && this.selectedFile1 ===undefined && this.selectedFile2===undefined){
    this.showSpinner=false;
    this.disableAddBtn=false;
    alert("Enter All Details !!");
   }
   else{
    uploadImageData.append('imageFile',this.selectedFile,this.selectedFile.name);
    uploadImageData1.append('imageFile1',this.selectedFile1,this.selectedFile1.name);
    uploadImageData2.append('imageFile2',this.selectedFile2,this.selectedFile2.name);
    this.todoService.addProduct(this.dummyProduct,uploadImageData,uploadImageData1,uploadImageData2);
    alert("Product Added !!");
     } 
    window.location.reload();
    }


   valiidateData(){
    if(this.dummyProduct.description===undefined && 
      this.dummyProduct.productName===undefined){
        return false;
      }
    else{
      return true;
    } 
   }
}

