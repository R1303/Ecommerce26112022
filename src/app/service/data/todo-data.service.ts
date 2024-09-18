import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Todo, User, Address, Product, Products, Cart, MyOrder, HomePage, ResponseMessgae } from 'src/app/list-todos/list-todos.component';
import { API_URL } from 'src/app/app.constants';
import { CheckoutDetail } from 'src/app/cart/cart.component';
import { EncrDecrServiceService } from '../encr-decr-service.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  userdata:User;
  cartData:Cart;
 
  productData:Products;
  addressData:Address;
  productArray:Products[]
  checkOutDetail:CheckoutDetail;
  expectedDate:Date;
  orderData:MyOrder;
  useJavaMethod=true;
  responseMessgae:any
  saveCartData:Cart;
  constructor(private http:HttpClient,
    private encryptKey:EncrDecrServiceService,
    public datepipe: DatePipe) { }

  reteriveAllTodos(username){
    try {
      return this.http.get<Todo[]>(`${API_URL}/user/${username}/todos`);  
    } catch (error) {
      return this.http.get<Todo[]>(`Error`);
    } 
  }

  reteriveAllUsers(username){
    try {
      return this.http.get<User[]>(`${API_URL}/getUserData/`);  
    } catch (error) {
      return this.http.get<User[]>(`Error`);
    } 
  }

  deleteTodos(id){
    try {
      return this.http.delete(`${API_URL}/deleteUserById/${id}`);  
    } catch (error) {
      return this.http.delete(`Error`);
    } 
  }

  getUser(id){
    try {
      return this.http.get<User>(`${API_URL}/getUserById/${id}`);  
    } catch (error) {
      return this.http.get<User>(`Error`);
    } 
  }

  getTodo(username,id){
    try {
      return this.http.get<Todo>(`${API_URL}/getTodoById/${username}/todo/${id}`);  
    } catch (error) {
      return this.http.get<Todo>(`Error`);
    } 
  }

  updateTodo(username,id,todo){
    try {
      return this.http.put(`${API_URL}/UpdateTodo/${username}/todos/${id}`,todo);  
    } catch (error) {
      
    } 
  }

  UpdateUser(id,user){
    try {
      return this.http.put(`${API_URL}/UpdateUser/${id}`,user);  
    } catch (error) {
      
    } 
  }

  

  getAddressUsingUserID(id){
    try {
      return this.http.get<Address[]>(`${API_URL}/getAddressById/${id}`);  
    } catch (error) {
      return this.http.get<Address[]>(`Error`);
    } 
  }

  addAddress(address){
    try {
      return this.http.post(`${API_URL}/addAddress`,address);  
    } catch (error) {
      
    } 
  }

  UpdateAddress(id,address){
    try {
      return this.http.put(`${API_URL}/UpdateAddress/${id}`,address);  
    } catch (error) {
      
    } 
  }

  deleteAddress(id){
    try {
      return this.http.delete(`${API_URL}/deleteAddressById/${id}`);  
    } catch (error) {
      return this.http.delete(`Error`);
    } 
  }

  addProduct(product,imageData1,imageData2,imageData3){
    try {
      return this.http.post(`http://localhost:5000/uploadImage1`,imageData1).subscribe(
        response =>{
          
          this.http.post(`http://localhost:5000/uploadImage2`,imageData2).subscribe(
            response =>{
              
              this.http.post(`http://localhost:5000/uploadImage3`,imageData3).subscribe(
                response =>{
                  
                  this.http.post(`http://localhost:5000/upload`,product).subscribe(
                    response =>{
                      this.responseMessgae=response;
                       return this.responseMessgae.status;
                    }
                  );
                }
              );  
            }
          );
        }
      );

    } catch (error) {
      alert(error)
    } 
  }

  allProduct(){
    try {
       this.http.get<Products[]>(`${API_URL}/allProduct`).subscribe(
        response =>{
           this.productArray= response;
        }
      );  
    } catch (error) {
      
    } 
  }

  allProductonShopScreen(){
    var key=this.encryptKey.testEncrypt("VerifiedUserForAccesingData");
    try {
       return this.http.get<Products[]>(`${API_URL}/allProduct/${key}`)
    } catch (error) {
      
    } 
  }

  getProductArray(){
    return this.productArray;
  }

  getProductById(id){
    try {
      return this.http.get<Products>(`${API_URL}/getProductById/${id}`)
   } catch (error) {
     
   } 
  }

  deleteProduct(id){
    try {
      return this.http.delete(`${API_URL}/deleteProductById/${id}`);  
    } catch (error) {
      return this.http.delete(`Error`);
    } 
  }

  saveCart(product,qunatity,userId){
    return this.http.post(`${API_URL}/addProductIntoCart/${qunatity}/${userId}`,product);
  }

  getCartDetail(userId){
    return this.http.get<Cart[]>(`${API_URL}/getCartDetail/${userId}`)
  }

  getCartDetailByProduct(productId,userId){
    return this.http.get<Cart[]>(`${API_URL}/getCartDetailProduct/${productId}/${userId}`)
  }

  UpdateCart(id,Cart){
    try {
      return this.http.put(`${API_URL}/UpdateCartItem/${id}`,Cart);  
    } catch (error) {
      
    } 
  }

  deleteCartItem(id,userId){
    try {
      return this.http.delete(`${API_URL}/deleteCartItemById/${id}/${userId}`);  
    } catch (error) {
      return this.http.delete(`Error`);
    } 
  }

  setCheckOutDetail(checkOutDetail){
     this.checkOutDetail=checkOutDetail;
  }
  getCheckOutDetail(){
    return this.checkOutDetail;
  }


  getOtp(mobile){
    return this.http.get(`${API_URL}/getOtp/${mobile}`);
  }

  verifyOtp(otp){
    return this.http.get<string>(`${API_URL}/verifyOtp/${otp}`);
  }

  setOrderDetail(userId,checkOutDetail){
    try {
      return this.http.put(`${API_URL}/setOrderDetail/${userId}`,checkOutDetail);  
    } catch (error) {
      
    } 
  }
  

  allOrderDetail(){
    return this.http.get<MyOrder[]>(`${API_URL}/allOrderDetails`);
  }

  getOrderDetail(userId){
    return this.http.get<MyOrder[]>(`${API_URL}/myOrderDetail/${userId}`);
  }

  getOrderDetailById(Id){
    return this.http.get<MyOrder>(`${API_URL}/orderDetail/${Id}`);
  }

  updateOrder(order){
    try {
      return this.http.put<MyOrder[]>(`${API_URL}/UpdateOrder`,order);  
    } catch (error) {
      
    } 
  }

  getProductByCategory(category){
    return this.http.get<Products[]>(`${API_URL}/getProductByCategory/${category}`);
  }
   
  getUrlData(url){
    try {
      return this.http.post(`${API_URL}/downLoadVideoApi`,url);
   } catch (error) {
     
   } 
  }

  homePageDetail(){
    try {
       return this.http.get<HomePage[]>(`${API_URL}/home_page_detail`);
    } catch (error) {
      
    } 
  }

  //All PHP Methods Start Here ............................................

  addTodo(user){
    try {
      this.userdata=user;
      var form = new FormData();
      form.append("action", "add_user");
      form.append("name", this.userdata.userName);
      form.append("email",this.userdata.userEmail);
      form.append("password", this.userdata.userPassword);
      form.append("mobile", this.userdata.userPhoneNumber);
      return this.http.post(`${API_URL}/insert_user.php`,form);  
    } catch (error) {
      alert(error)
    } 
  }

  getUserPHP(email,pass){
    var form = new FormData();
      form.append("action", "find_user");
      form.append("email",email);
      form.append("password",pass);
      return this.http.post(`${API_URL}/insert_user.php`,form); 
  }

  allProductonPHP(){
    try {
       return this.http.get<Products[]>(`${API_URL}/allProduct.php?action=allProduct`);
    } catch (error) {
      
    } 
  }

  ProductByIdPHP(id){
    try {
       return this.http.get<Products[]>(`${API_URL}/allProduct.php?action=findByID&id=`+id);
    } catch (error) {
      
    } 
  }

  getCartDetailByProductPHP(productId,userId){
    return this.http.get<Cart[]>(`${API_URL}/allProduct.php?action=getCartDetailProduct&productId=`+productId+`&userId=`+userId);
  }

  
  getProductByCategoryPHP(category){
    return this.http.get<Products[]>(`${API_URL}/allProduct.php?action=getProductByCategory&category=`+category);
  }


  saveCartPHP(product,qunatity,userId){
   this.productData=product;
   var total = (this.productData.productPrice*qunatity);
    var form = new FormData();
      form.append("action", "addCart");
      form.append("productImage1", this.productData.productImage1);
      form.append("productName", this.productData.productName);
      form.append("productPrice", this.productData.productPrice.toString());
      form.append("quantity", qunatity.toString());
      form.append("total", total.toString());
      form.append("userFk",userId);
      form.append("productFk", this.productData.id.toString());
    return this.http.post(`${API_URL}/cartDetail.php`,form);
  }

  getCartDetailPHP(userId){
    return this.http.get<Cart[]>(`${API_URL}/getCartData.php?action=getCartById&userFk=`+userId);
  }

  
  UpdateCartPHP(id,Cart){
    this.cartData=Cart;
    var form = new FormData();
    form.append("action", "updateCart");
    form.append("quantity", this.cartData.quantity.toString());
    form.append("total", this.cartData.total.toString());
    form.append("userFk",this.cartData.fk_user.toString());
    form.append("cartID", this.cartData.id.toString());  
    try {
      return this.http.post(`${API_URL}/cartDetail.php`,form);  
    } catch (error) {
      
    } 
  }

  deleteCartItemPHP(id){
    var form = new FormData();
    form.append("action", "deleteCart");
    form.append("cartID", id); 
    try {
      return this.http.post(`${API_URL}/cartDetail.php`,form);  
    } catch (error) {
      return this.http.delete(`Error`);
    } 
  }



  getAddressUsingUserIDPHP(id){
    try {
      return this.http.get<Address[]>(`${API_URL}/getAddressData.php?action=getAddressById&userFk=`+id);  
    } catch (error) {
      return this.http.get<Address[]>(`Error`);
    } 
  }

  addAddressPHP(address){
    this.addressData=address;
    var form = new FormData();
      form.append("action", "addAddress");
      form.append("address_type",this.addressData.address_type);
      form.append("city",this.addressData.city);
      form.append("address_line_1",this.addressData.address_line_1);
      form.append("address_line_2",this.addressData.address_line_2);
      form.append("pincode",this.addressData.pincode.toString());
      form.append("state",this.addressData.state);
      form.append("user_id",this.addressData.userId.toString());

    try {
      return this.http.post(`${API_URL}/addressAction.php`,form);  
    } catch (error) {
      
    } 
  }

  UpdateAddressPHP(user_id,address){
    this.addressData=address;
    var form = new FormData();
      form.append("action", "updateAddress");
      form.append("address_type",this.addressData.address_type);
      form.append("city",this.addressData.city);
      form.append("address_line_1",this.addressData.address_line_1);
      form.append("address_line_2",this.addressData.address_line_2);
      form.append("pincode",this.addressData.pincode.toString());
      form.append("state",this.addressData.state);
      form.append("user_id",user_id);
      form.append("address_id",this.addressData._id.toString());
    try {
      return this.http.post(`${API_URL}/addressAction.php`,form); 
    } catch (error) {
      
    } 
  }

  deleteAddressPHP(id){
    var form = new FormData();
    form.append("action", "deleteAddress");
    form.append("address_id",id);
    try {
      return this.http.post(`${API_URL}/addressAction.php/`,form);  
    } catch (error) {
      return this.http.delete(`Error`);
    } 
  }


  setOrderDetailPHP(cart,checkOutDetail){
     this.cartData=cart;
    var form = new FormData();
      form.append("action", "addOrder");
      form.append("city",this.checkOutDetail.city);
      form.append("address_line_1",this.checkOutDetail.line1);
      form.append("address_line_2",this.checkOutDetail.line2);
      form.append("pincode",this.checkOutDetail.pincode.toString());
      form.append("fk_product",this.cartData.fk_product.toString());
      form.append("productImage1", this.cartData.product_image1);
      form.append("productName", this.cartData.product_name);
      form.append("productPrice", this.cartData.product_price.toString());
      form.append("quantity", this.cartData.quantity.toString());
      form.append("state",this.checkOutDetail.state);
      form.append("total", this.cartData.total.toString());
      form.append("fk_user",this.cartData.fk_user.toString());
      form.append("status","Confirmed");
      this.expectedDate = new Date();
      this.expectedDate.setDate( this.expectedDate.getDate() + 7 );
      form.append("expected_date",this.datepipe.transform(this.expectedDate, 'yyyy-MM-dd'));
      form.append("order_date",this.datepipe.transform(new Date(), 'yyyy-MM-dd'));
    try {
      return this.http.post(`${API_URL}/api/addOrderDetails`,form);  
    } catch (error) {
      
    } 
  }
  

  allOrderDetailPHP(){
    return this.http.get<MyOrder[]>(`${API_URL}/getOrderDetail.php?action=allOrder`,);
  }

  getOrderDetailPHP(userId){
    return this.http.get<MyOrder[]>(`${API_URL}/getOrderDetail.php?action=getOrderByUserId&userFk=`+userId);
  }

  getOrderDetailByIdPHP(Id){
    return this.http.get<MyOrder>(`${API_URL}/getOrderDetail.php?action=getOrderById&orderId=`+Id);
  }

  updateOrderPHP(order){
    this.orderData=order;
    var form=new FormData();
    form.append("action","updateOrder");
    form.append("order_id",this.orderData.id.toString());
    form.append("status",this.orderData.status);
    try {
      return this.http.post(`${API_URL}/orderDetail.php`,form);  
    } catch (error) {
      
    } 
  }


  homePageDetailPHP(){
    try {
       return this.http.get<HomePage[]>(`https://ecommerce-1234.000webhostapp.com/home_page_detail.php`);
    } catch (error) {
      
    } 
  }

  UpdateUserPicPHP(id,file){
    var form=new FormData();
    form.append("action",'update_user')
    form.append("pic",file);
    form.append("userId",id);
    try {
      return this.http.post(`${API_URL}/insert_user.php`,form);  
    } catch (error) {
      
    } 
  }

  UpdateUserPhonePHP(id,mobile){
    var form=new FormData();
    form.append("action",'update_user_phone')
    form.append("mobile",mobile);
    form.append("userId",id);
    try {
      return this.http.post(`${API_URL}/insert_user.php`,form);  
    } catch (error) {
      
    } 
  }

  getUserByIdPHP(id){
      return this.http.get(`${API_URL}/user_data.php?id=`+id); 
  }


  // -------------------------------------------------------------

  getUserMongoDB(email,pass){
      return this.http.get(`${API_URL}/api/login/`+email+`/`+pass);
  }

  updateUserMongoDB(user){
    try {
      return this.http.put(`${API_URL}/api/updateUser`,user);  
    } catch (error) {
      
    } 
  }

  homePageDetailMongoDB(){
    try {
       return this.http.get<HomePage[]>(`${API_URL}/api/home_page_details`);
    } catch (error) {
      
    } 
  }

  allProductonShopScreenMongoDB(){
    try {
       return this.http.get<Products[]>(`${API_URL}/api/allProducts`)
    } catch (error) {
      
    } 
  }

  ProductByIdMongoDB(id){
    try {
       return this.http.get<Products[]>(`${API_URL}/api/findById/`+id);
    } catch (error) {
      
    } 
  }

  addProuctMongoDB(product){
    return this.http.post(`${API_URL}/api/addProduct`,product);
  }

  deleteProductMongoDB(id){
    try {
      return this.http.delete(`${API_URL}/api/deleteProductItem/${id}`,id);  
    } catch (error) {
      return this.http.delete(`Error`);
    } 
  }

  getUserByIDMongoDB(id){
    try {
      return this.http.get<User>(`${API_URL}/api/findUserById/${id}`);  
    } catch (error) {
      return this.http.get<User>(`Error`);
    } 
  }

  getProductByCategoryMongoDB(category){
    return this.http.get<Products[]>(`${API_URL}/api/findProductByCategory/${category}`);
  }

  getCartDetailByProductMongoDB(productId,userId){
    return this.http.get<Cart[]>(`${API_URL}/api/getCartDetailProduct/`+productId+`/`+userId);
  }


  UpdateCartMongoDB(id,Cart){
    this.cartData=Cart;
    try {
      return this.http.post(`${API_URL}/api/updateCartDetail`,this.cartData);  
    } catch (error) {
      
    } 
  }

  saveCartMongoDB(cart){
     return this.http.post(`${API_URL}/api/saveCartDetail`,cart);
   }

   getCartDetailMongoDB(userId){
    return this.http.get<Cart[]>(`${API_URL}/api/getCartByUserId/`+userId);
  }

  getAddressUsingUserIDMongoDB(id){
    try {
      return this.http.get<Address[]>(`${API_URL}/api/getAddressByUserId/`+id);  
    } catch (error) {
      return this.http.get<Address[]>(`Error`);
    } 
  }

  UpdateAddressMongoDB(user_id,address){
    // this.addressData=address;
    // var form = new FormData();
    //   form.append("action", "updateAddress");
    //   form.append("address_type",this.addressData.address_type);
    //   form.append("city",this.addressData.city);
    //   form.append("address_line_1",this.addressData.address_line_1);
    //   form.append("address_line_2",this.addressData.address_line_2);
    //   form.append("pincode",this.addressData.pincode.toString());
    //   form.append("state",this.addressData.state);
    //   form.append("user_id",user_id);
    //   form.append("address_id",this.addressData._id.toString());
    try {
      return this.http.post(`${API_URL}/api/updateAddress`,address); 
    } catch (error) {
      
    } 
  }

  addUserMongoDB(user){
    try {
      return this.http.post(`${API_URL}/api/register`,user);  
    } catch (error) {
      alert(error)
    } 
  }

  addAddressMongoDB(address){
    try {
      return this.http.post(`${API_URL}/api/addAddress`,address);  
    } catch (error) {
      alert(error)
    } 
  }
  deleteCartMongoDB(id){
    try {
      return this.http.post(`${API_URL}/api/deleteCartItem/${id}`,id);  
    } catch (error) {
      return this.http.delete(`Error`);
    } 
  }

  deleteCartItemMongoDB(id){
    try {
      return this.http.post(`${API_URL}/api/deleteCartItemByID/${id}`,id);  
    } catch (error) {
      return this.http.delete(`Error`);
    } 
  }

  deleteAddressMongoDB(id){
    try {
      return this.http.delete(`${API_URL}/api/deleteAddressById/${id}`);  
    } catch (error) {
      return this.http.delete(`Error`);
    } 
  }

  setOrderDetailMongoDB(cart,checkOutDetail){
    this.cartData=cart;
    this.expectedDate = new Date();
     this.expectedDate.setDate( this.expectedDate.getDate() + 7 );
    this.orderData= new MyOrder(this.cartData.id,this.cartData.product_image1,this.cartData.product_name,
      this.cartData.product_price,this.cartData.quantity,this.cartData.total,
      this.cartData.fk_user,this.cartData.fk_product,
      this.checkOutDetail.line1,this.checkOutDetail.line2,this.checkOutDetail.city,
      this.checkOutDetail.state,this.checkOutDetail.pincode,"Confirmed",
      this.datepipe.transform(new Date(), 'yyyy-MM-dd'),this.datepipe.transform(this.expectedDate, 'yyyy-MM-dd'))
   try {
     return this.http.post(`${API_URL}/api/addOrder`,this.orderData);  
   } catch (error) {
     
   } 
 }

 getOrderDetailMongoDB(userId){
  return this.http.get<MyOrder[]>(`${API_URL}/api/getOrderByUserId/`+userId);
}

getOrderDetailByOrderId(orderId){
  return this.http.get<MyOrder>(`${API_URL}/api/getOrderByOrderId/`+orderId);
}
allOrderDetailMongoDB(){
  return this.http.get<MyOrder[]>(`${API_URL}/api/allOrdersDetails`);
}
updateOrderMongoDB(order){
  try {
    return this.http.put<MyOrder[]>(`${API_URL}/api/updateOrder`,order);  
  } catch (error) {
    
  } 
}

}
