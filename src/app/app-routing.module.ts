import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { TodoComponent } from './todo/todo.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterComponent } from './register/register.component';
import { DeactivateServiceService } from './service/deactivate-service.service';
import { AddProductComponent } from './add-product/add-product.component';
import { ShopComponent } from './shop/shop.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuardService } from './service/admin-guard.service';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutGuardService } from './service/checkout-guard.service';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AllAddressComponent } from './all-address/all-address.component';

const routes: Routes = [
  {path :"" ,component : MainPageComponent},
  {path :"login" ,component : LoginComponent,canActivate:[DeactivateServiceService]},
  {path :"register" ,component : RegisterComponent,canActivate:[DeactivateServiceService]},
  {path :"main" ,component : MainPageComponent},
  {path :"main/:name" ,component : MainPageComponent,canActivate:[RouteGuardService]},
  {path :"welcome/:name" ,component : WelcomeComponent,canActivate:[RouteGuardService]},
  {path :"listTodos" ,component : ListTodosComponent},
  {path :"logout" ,component : LogoutComponent,canActivate:[RouteGuardService]},
  {path :"todo/:id" ,component : TodoComponent,canActivate:[RouteGuardService]},
  {path :"shop" ,component : ShopComponent},
  {path :"shop/:category" ,component : ShopComponent},
  {path :"singleProduct/:id" ,component : SingleProductComponent},
  {path :"cart" ,component : CartComponent,canActivate:[RouteGuardService]},
  {path :"admin" ,component : AdminComponent,canActivate:[AdminGuardService]},
  {path :"addProduct" ,component : AddProductComponent,canActivate:[RouteGuardService]},
  {path :"checkout" ,component : CheckoutComponent,canActivate:[CheckoutGuardService]},
  {path :"verifyUser" ,component : VerifyUserComponent,canActivate:[CheckoutGuardService]},
  {path :"placeOrder" ,component : PlaceOrderComponent,canActivate:[CheckoutGuardService]},
  {path :"myOrder" ,component : MyOrderComponent,canActivate:[RouteGuardService]},
  {path :"orderDetail/:id" ,component : OrderDetailComponent,canActivate:[RouteGuardService]},
  {path :"allAddress" ,component : AllAddressComponent,canActivate:[RouteGuardService]},
  {path :"about" ,component : AboutComponent},
  {path :"contact" ,component : ContactComponent},
  {path :"error" ,component : ErrorComponent},
  {path :"**" ,component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
