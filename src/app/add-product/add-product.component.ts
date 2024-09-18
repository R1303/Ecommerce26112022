import { Component, OnInit } from '@angular/core';
import { Product, Products } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable, finalize, forkJoin } from 'rxjs';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';

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
  dummyProduct:Products
  id=0
  status:any
  showSpinner:boolean;
  disableAddBtn:boolean;
  imageUrl1:String;
  imageUrl2:String;
  imageUrl3:String;
  uploadProgress:Observable<UploadTaskSnapshot>[];
  imageUrls:any[];
  selectedFiles:File[] = [];
  completedUploads:number=0;
  constructor(private todoService:TodoDataService,private router:Router,private storage:AngularFireStorage) { }

  ngOnInit() {
    //this.showSpinner=true;
    this.category="Fruits";
   //this.showSpinner=false;
   const randomNumber = Math.floor(Math.random() * 1000000);
    this.id = randomNumber;
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
    this.showSpinner=true;
   this.uploadProgress = [];
   this.imageUrls = [];
   const uploadImageData = new FormData();
   const uploadImageData1 = new FormData();
   const uploadImageData2 = new FormData();
   
   if(this.valiidateData()===false && this.selectedFile===undefined && this.selectedFile1 ===undefined && this.selectedFile2===undefined){
    this.showSpinner=false;
    this.disableAddBtn=false;
    alert("Enter All Details !!");
   }
   else{
    // uploadImageData.append('imageFile',this.selectedFile,this.selectedFile.name);
    // uploadImageData1.append('imageFile1',this.selectedFile1,this.selectedFile1.name);
    // uploadImageData2.append('imageFile2',this.selectedFile2,this.selectedFile2.name);
    // this.todoService.addProduct(this.dummyProduct,uploadImageData,uploadImageData1,uploadImageData2);
      this.selectedFiles.push(this.selectedFile);
      this.selectedFiles.push(this.selectedFile1);
      this.selectedFiles.push(this.selectedFile2);
      // this.uploadImageInFirebase(this.selectedFile);
      // this.uploadImageInFirebase(this.selectedFile1);
      // this.uploadImageInFirebase(this.selectedFile2);
      
      //for (const file of this.selectedFiles) {
        this.uploadImageInFirebase(this.completedUploads); 
      //}
      //console.log(this.completedUploads === this.selectedFiles.length);
     forkJoin(this.uploadProgress).subscribe(() => {

      console.log('All images uploaded:', this.imageUrls.length);
      console.log('All images uploaded:', this.imageUrls.length);
      console.log('All images uploaded:', this.imageUrls[2]);

      this.dummyProduct=new Products(this.id,this.productName,(Number(this.productPrice)),this.description,this.category,
      this.imageUrls[0],this.imageUrls[1],this.imageUrls[2]);
      //this.todoService.addProuctMongoDB(this.dummyProduct).subscribe();
    });
     
    alert("Product Added Successfully !!");
     } 
    //window.location.reload();
   
    this.showSpinner=false;
    }


    uploadImageInFirebase(completedUploads:number){
      for (const productImage of this.selectedFiles) {
      const filePath = `productImages/${this.category}/${this.productName}/${productImage.name}`;
      const fileRef = this.storage.ref(filePath);
      const task =  fileRef.put(productImage);   
      
      const uploadTask = task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.imageUrls.push(url);
            completedUploads++;
            if(completedUploads === this.selectedFiles.length){
              this.dummyProduct=new Products(this.id,this.productName,(Number(this.productPrice)),this.description,this.category,
                this.imageUrls[0],this.imageUrls[1],this.imageUrls[2]);
                this.todoService.addProuctMongoDB(this.dummyProduct).subscribe();
            }
          });
        })
      );

      this.uploadProgress.push(uploadTask);
      }

      // task.percentageChanges().subscribe(percentage => {
      //   //console.log('Upload is ' + percentage + '% done');
      // });
    
      // task.snapshotChanges().subscribe(snapshot => {
      //   if (snapshot.state === 'success') {
      //     console.log('Upload successful');
      //     fileRef.getDownloadURL().subscribe(downloadURL => {
      //       console.log('File available at', downloadURL);
      //       this.imageUrls.push(downloadURL);
      //     });
      //   }
      // });
     }
   valiidateData(){
    if(this.productName===undefined && 
      this.productPrice===undefined){
        return false;
      }
    else{
      return true;
    } 
   }

  clearData(){
    this.selectedFile = null;
    this.selectedFile1 = null;
    this.selectedFile2 = null;
    this.productName="";
    this.productPrice="";
    this.description="";
  }
}

