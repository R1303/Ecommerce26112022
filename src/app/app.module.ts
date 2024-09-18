import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from  '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { TodoComponent } from './todo/todo.component';
import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';
import { EncrDecrServiceService } from './service/encr-decr-service.service';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterComponent } from './register/register.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AppSpinnerComponent } from './app-spinner/app-spinner.component';
import { ShopComponent } from './shop/shop.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminComponent } from './admin/admin.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AllAddressComponent } from './all-address/all-address.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
declare var require: any;
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ListTodosComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    TodoComponent,
    RegisterComponent,
    AppSpinnerComponent,
    ShopComponent,
    SingleProductComponent,
    CartComponent,
    CheckoutComponent,
    AddProductComponent,
    AdminComponent,
    VerifyUserComponent,
    PlaceOrderComponent,
    MyOrderComponent,
    AboutComponent,
    ContactComponent,
    OrderDetailComponent,
    AllAddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
AngularFireModule.initializeApp(environment.firebaseConfig),
AngularFireStorageModule,
    NgCircleProgressModule.forRoot({
     
    }),
    
    
  ],
  providers: [
     {provide:HTTP_INTERCEPTORS,useClass:HttpIntercepterBasicAuthService,multi:true},
     EncrDecrServiceService,
     DatePipe
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
