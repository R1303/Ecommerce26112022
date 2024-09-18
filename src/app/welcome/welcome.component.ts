import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';
import { TodoDataService } from '../service/data/todo-data.service';
import { User, Address } from '../list-todos/list-todos.component';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { API_URL } from '../app.constants';
import * as MobileDetect from 'mobile-detect';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  name = ''
  email: string
  phone: string
  users: User[];
  User: User;
  fileToUpload: File = null;
  welcomeMsg: string
  errorMsg: string
  isEmailAvailable: boolean
  isMobileAvailable: boolean
  isProfilePicAvailable: boolean
  fileName: string

  progress = 0;
  intervalId;
  showScreen: boolean;
  showProgress = false;
  isPC: boolean;
  addressArray: Address[];
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
  retrunResponseMsg: string;
  showSpinner: boolean;
  isAdmin: boolean;
  selectedAddress: Address;
  spclCharMobile:boolean;
  blankMobile:boolean;
  user_id:any;
  application_url:string;
  user_image:string;
  constructor(private route: ActivatedRoute,
    private service: WelcomeDataService,
    private todoService: TodoDataService,
    private basicAuthService: BasicAuthenticationService,
    private router:Router,
    private storage:AngularFireStorage) { }
  ngOnInit() {
    this.showSpinner = true;
    this.checkProfilePic();
    this.application_url=API_URL;
    //this.User = this.basicAuthService.getUserById();
    var userAgent = window.navigator.userAgent;
    var md = new MobileDetect(userAgent);
    this.isPC = md.mobile()!=null;
    this.user_id=this.getId();
    this.isAdmin = this.isAdminUser(this.user_id);
    this.name = this.route.snapshot.params['name'];
    this.todoService.getUserByIDMongoDB(this.getId()).subscribe(
      response=>{
          this.User=response;
          this.email = this.User.userEmail;
          this.phone = this.User.userPhoneNumber;
          this.user_image = this.User.user_image;
          if(this.user_image!=null || this.user_image==undefined){
            this.isProfilePicAvailable = true;
          }
          this.todoService.getAddressUsingUserIDMongoDB(this.getId()).subscribe(
            response => {
              this.addressArray = response;
              if (this.addressArray.length > 0) {
                this.showAddress = true;
                this.address = this.addressArray[this.addressArray.length - 1];
              }
              if (this.addressArray.length > 1) {
                this.isMoreAddress = true;
              }
              
            }
          );
          const getDownloadProgress = () => {
            if (this.progress <=55) {
              this.progress = this.progress + 1;
              this.refreshTodos();
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
    )
    
  }

  isAdminUser(id){
    return id=="63de4647732cefaa102d9a48";
  }

  checkProfilePic(){
    if(sessionStorage.getItem('pic_type')!='null' && sessionStorage.getItem('pic_type')!='undefined'){
           this.isProfilePicAvailable=true;
    }
  }

  checkFlagValues() {
    if (this.email != null) {
      this.isEmailAvailable = true;
    }
    if (this.phone != null) {
      this.isMobileAvailable = true;
    }
    this.showProgress = false;
  }

  getId() {
    return sessionStorage.getItem('id');
  }

  refreshTodos() {
    this.email = this.User.userEmail;
    this.phone = this.User.userPhoneNumber;
    this.checkFlagValues();

  }
  getResponse() {
    if (this.users[0] != null) {
      this.getDimensionsByFind(this.name);
    }
  }


  getDimensionsByFind(name) {
    for (var i = 0; i < this.users.length; i++) {
      var user = this.users[i];
      if (user.userName === name && (user.id) + "" === this.getId()) {
        this.email = user.userEmail;
        this.phone = user.userPhoneNumber;
        this.checkFlagValues();
      }
    }
  }

  getWelcomeData() {
    this.service.excuteGetWelcomeData().subscribe(
      response => this.handleResponseMsg(response),
      error => this.handleErrorResponse(error)
    );
  }

  getWelcomeDataWithParameter() {
    this.service.excuteGetWelcomeDataWithParameter(this.name).subscribe(
      response => this.handleResponseMsg(response),
      error => this.handleErrorResponse(error)
    );
  }

  handleResponseMsg(response) {
    this.welcomeMsg = response.msg;
  }

  handleErrorResponse(error) {
    this.errorMsg = 'Something Went Wrong! Please Contact Support.'
  }

  openFileOption() {
    document.getElementById("upload_File").click();
  }
  fileSelected(file) {
    this.showSpinner=true;
    this.fileToUpload = file.target.files[0];
    document.getElementById("upload").click();
  }

  uploadProfilePicOnCloud() {
    this.todoService.UpdateUserPicPHP(this.getId(),this.fileToUpload).subscribe(
      response =>{
        sessionStorage.setItem('pic_type',this.fileToUpload.type);
        this.showSpinner=false;
        alert("SuccessFully Uploaded !!")
        window.location.reload();
      }
    )
    
  }

  uploadImageInFirebase(){
    const filePath = `user_images/${this.name}/${this.fileToUpload.name}`;
    const fileRef = this.storage.ref(filePath);
    const task =  fileRef.put(this.fileToUpload);   
    
    // const uploadTask = task.snapshotChanges().pipe(
    //   finalize(() => {
    //     fileRef.getDownloadURL().subscribe(url => {
    //       this.User.user_image=url;
    //       this.todoService.updateUserMongoDB(this.User).subscribe(
    //         response=>{
    //           sessionStorage.setItem('pic_type',this.fileToUpload.type);
    //           this.showSpinner=false;
    //           alert("SuccessFully Uploaded !!")
    //           window.location.reload();
    //         }
    //       )
    //     })
    //     })
    //   );

      task.snapshotChanges().subscribe(snapshot => {
        if (snapshot.state === 'success') {
          console.log('Upload successful');
          fileRef.getDownloadURL().subscribe(downloadURL => {
            console.log('File available at', downloadURL);
            this.User.user_image=downloadURL;
             this.todoService.updateUserMongoDB(this.User).subscribe(
            response=>{
              sessionStorage.setItem('pic_type',this.fileToUpload.type);
              this.showSpinner=false;
              alert("SuccessFully Uploaded !!")
              window.location.reload();
            }
          )
          });
        }
      });
  }

  showModal(id) {
    var address = document.querySelector('#' + id);
    console.log(address);
    (document.querySelector('.container-fluid') as HTMLElement).style.opacity = '0.4';
    var classname = (address as HTMLElement).style.display = "block";
  }
  disMissMadal(id) {
    console.log(id);
    (document.querySelector('.container-fluid') as HTMLElement).style.opacity = '1';
    (document.querySelector('#' + id) as HTMLElement).style.display = "none";
  }

  getAddress(id) {
    this.todoService.getAddressUsingUserIDMongoDB(id).subscribe(
      response => {
        this.addressArray = response;
        alert(this.addressArray[0]._id);
      }
    );
  }

  addAddressHit() {
    this.showSpinner = true;
    this.showScreen = false;
    this.disMissMadal('AddAddress');
    this.dummyAddress = new Address(this.addressId, this.line1, this.line2, this.city, this.state, this.pincode, this.getId(), "null");
    this.todoService.addAddressMongoDB(this.dummyAddress).subscribe(
      response => {
        this.showSpinner = false;
        this.showScreen = true;
        this.retrunResponseMsg = "Successfully Added !!"
        this.disMissMadal('AddAddress');
        this.ngOnInit();
        window.location.reload();
      }
    );
  }

  updateMobileNo() {
    this.disMissMadal('updatePhoneNo');
    sessionStorage.setItem('phone',this.phone);
    this.User.userPhoneNumber=this.phone;
    this.todoService.updateUserMongoDB(this.User).subscribe(
      response=>{
        this.ngOnInit();
      }
    )
        // this.todoService.UpdateUserPhonePHP(this.basicAuthService.getUserID(),this.phone).subscribe(
        //   response => {
        //     this.ngOnInit();
        //   }
        // )
  }


  CheckBox_Checked(selectedId) {
    this.showSpinner = true;
    this.selectAddressHit(selectedId);
    this.showSpinner = false
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

  makeDefault() {
    if (this.selectedAddress != null) {
      this.todoService.UpdateAddressMongoDB(this.getId(), this.selectedAddress).subscribe(
        response => {
          console.log("Address Updated")
        }
      );
      this.disMissMadal('SelectAddress');
    }
    else {
      alert("Please Select an Address")
    }
  }


  allAddressPage(){
    this.router.navigate(['allAddress']);
  }
}


