package com.rajan.ecommerce9.rest.configuration;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import com.google.gson.Gson;
import com.rajan.ecommerce9.Application;
import com.rajan.ecommerce9.database.config.AddressJpaRespository;
import com.rajan.ecommerce9.database.config.CartJpaRespository;
import com.rajan.ecommerce9.database.config.DBUtill;
import com.rajan.ecommerce9.database.config.MyOrderJpaRespository;
import com.rajan.ecommerce9.database.config.ProductJpaRespository;
import com.rajan.ecommerce9.database.config.UserDataJpaRespository;
import com.rajan.ecommerce9.database.config.UserJpaRespository;
import com.rajan.ecommerce9.database.config.homePageRepo;
import com.rajan.ecommerce9.entity.Address;
import com.rajan.ecommerce9.entity.ApplicationSetup;
import com.rajan.ecommerce9.entity.Cart;
import com.rajan.ecommerce9.entity.HomePageDetail;
import com.rajan.ecommerce9.entity.MyOrder;
import com.rajan.ecommerce9.entity.Product;
import com.rajan.ecommerce9.entity.User;
import com.rajan.ecommerce9.entity.UserData;
import com.rajan.ecommerce9.helper.CheckoutDetail;
import com.rajan.ecommerce9.helper.ProductCopy;
import com.rajan.ecommerce9.helper.TestClass;
@CrossOrigin()
@RestController
public class DeviceRestController {
	@Autowired
	private UserJpaRespository jpaRespository;
	@Autowired
	private AddressJpaRespository addressJpaRespository;
	@Autowired
	private ProductJpaRespository productJpaRespository;
	@Autowired
	private CartJpaRespository cartJpaRespository;
	@Autowired
	private MyOrderJpaRespository myOrderJpaRespository;
	@Autowired
	private UserDataJpaRespository userDataJpaRespository;
	@Autowired
	private homePageRepo homePageRepo;
	@Autowired
	private Storage storage;

	private String image1;
	private String image2;
	private String image3;
	public  Bucket bucket;
	public  String bucketName;
	public  int otp;
	public  static final String projectId = "fillbasket-aace0";
    public  static final String encryptKey="mykey#91mykey#91";
	
	public DeviceRestController(){}
	
	@GetMapping(path = "/action/{name}")
	public TestClass action(@PathVariable String name) {
		return new TestClass("Hello " + name);
	}
	
	
	/**
	 * @param id
	 * @return Get User object using ID
	 */
	@GetMapping("/getUserById/{id}")
	public User getUserById(@PathVariable long id) {
		return jpaRespository.findById(id).get();
	}

	/**
	 * @return Get All User Data
	 */
	@GetMapping("/getUserData")
	public List<User> getUserData() {
		try {
			return jpaRespository.findAll();
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * @param id Delete User By Id
	 */
	@DeleteMapping("/deleteUserById/{id}")
	public void deleteUserById(@PathVariable long id) {
		jpaRespository.deleteById(id);
	}

	/**
	 * @param user
	 * @return Update User By Id
	 */
	@PutMapping("/UpdateUser/{id}")
	public ResponseEntity<User> updateUser(@RequestBody User user) {
		User updatedUser = jpaRespository.save(user);
		return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
	}

	/**
	 * @param user
	 * @return Adding User using Rest API
	 */
	@PostMapping("/addUser")
	public ResponseEntity<User> addUser(@RequestBody User user) {
		jpaRespository.save(user);
		return new ResponseEntity<User>(HttpStatus.OK);
	}

	/**
	 * @param user Adding User using internally call method
	 */
	public void addUserInternally(User user) {
	}

	/**
	 * @param id
	 * @return Get Address's using User Id
	 */
	@GetMapping("/getAddressById/{id}")
	public List<Address> getAddressById(@PathVariable long id) {
		return addressJpaRespository.findAddressByuserId(id);
	}

	/**
	 * @param address
	 * @return Add Address using Rest API URL
	 */
	@PostMapping("/addAddress")
	public ResponseEntity<User> addAddress(@RequestBody Address address) {
		addressJpaRespository.save(address);
		return new ResponseEntity<User>(HttpStatus.OK);
	}

	/**
	 * @param id Delete Address By Id
	 */
	@DeleteMapping("/deleteAddressById/{id}")
	public void deleteAddressById(@PathVariable long id) {
		addressJpaRespository.deleteById(id);
	}

	/**
	 * @param address
	 * @return Update Address using ID
	 */
	@PutMapping("/UpdateAddress/{id}")
	public ResponseEntity<Address> updateAddress(@RequestBody Address address, @PathVariable long id) {
		Address updatedAddress = null;
		try {
			if (address.getAddress_type().equalsIgnoreCase("default")) {
				List<Address> addressList = getAddressById(id);
				for (int i = 0; i < addressList.size(); i++) {
					if (addressList.get(i).getaddress_id() != address.getaddress_id()) {
						Address loopAddress = addressList.get(i);
						loopAddress.setAddress_type("null");
						addressJpaRespository.save(loopAddress);
					} else {
						addressJpaRespository.save(address);
					}
				}
			} else {
				updatedAddress = addressJpaRespository.save(address);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Address>(updatedAddress, HttpStatus.OK);
	}

	/**
	 * @param productCopy
	 * It's used for upload Product Details in Database
	 * @return
	 */
	@PostMapping("/upload")
	public Response upload(@RequestBody ProductCopy productCopy) {
		try {
			Product product = new Product(1, productCopy.getProductName(), productCopy.getProductPrice(),
					productCopy.getDescription(), productCopy.getCategory(), this.image1, this.image2, this.image3);
			productJpaRespository.save(product);
			return new Response("Ok");
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	

	/**
	 * @param file
	 * It's used for upload Image 1 of product into Firebase.
	 * @return
	 */
	@PostMapping("/uploadImage1")
	public ResponseEntity<Product> uploadImage1(@RequestParam("imageFile") MultipartFile file) {
		try {
			this.image1 = null;
			System.out.println("Original Image Byte Size - " + file.getBytes().length);
			//bucket = StorageClient.getInstance().bucket();
			bucketName = "fillbasket-aace0.appspot.com";//bucket.getName();
			System.out.println("bucketName - " + bucketName);
			byte[] bytes = file.getBytes();
			String objectName = file.getName() + file.hashCode();
			String type = file.getContentType();
			this.image1 = uploadObject(projectId, bucketName, objectName, bytes, type);
			return new ResponseEntity<Product>(HttpStatus.OK);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * @param file
	 * It's used for upload Image 2 of product into Firebase.
	 * @return
	 */
	@PostMapping("/uploadImage2")
	public ResponseEntity<Product> uploadImage2(@RequestParam("imageFile1") MultipartFile file) {
		try {
			this.image2 = null;
			System.out.println("Original Image Byte Size - " + file.getBytes().length);
			byte[] bytes = file.getBytes();
			String objectName = file.getName() + file.hashCode();
			String type = file.getContentType();
			this.image2 = uploadObject(projectId, bucketName, objectName, bytes, type);
			return new ResponseEntity<Product>(HttpStatus.OK);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}

	}

	/**
	 * @param file
	 * It's used for upload Image 3 of product into Firebase.
	 * @return
	 */
	@PostMapping("/uploadImage3")
	public ResponseEntity<Product> uploadImage3(@RequestParam("imageFile2") MultipartFile file) {
		try {
			this.image3 = null;
			System.out.println("Original Image Byte Size - " + file.getBytes().length);
			byte[] bytes = file.getBytes();
			String objectName = file.getName() + file.hashCode();
			String type = file.getContentType();
			this.image3 = uploadObject(projectId, bucketName, objectName, bytes, type);
			return new ResponseEntity<Product>(HttpStatus.OK);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * @param key
	 * @param request
	 * It's using to get the all Product.
	 * @return
	 */
	@GetMapping("/allProduct/{key}")
	public String getProduct(@PathVariable String key,HttpServletRequest request) {
		String origin = request.getHeader("origin");
		Gson gson = new Gson();
		String websiteName=getConnDetail(origin);
		if(Application.checkWebsiteOrigin) {
			if (websiteName!=null && websiteName.equals("FillBasket")) {
				List<Product> productList = productJpaRespository.findAll();
				String jsonCartList = gson.toJson(productList);
				return jsonCartList;
			} else {
				return gson.toJson("Unknown Request 404");
			}
		}
		else {
			List<Product> productList = productJpaRespository.findAll();
			String jsonCartList = gson.toJson(productList);
			return jsonCartList;
		}
	}

	/**
	 * @param id
	 * @param request
	 * It's using to get Product detail by Product Id.
	 * @return
	 */
	@GetMapping("getProductById/{id}")
	public String getProductById(@PathVariable int id,HttpServletRequest request) {
		String origin = request.getHeader("origin");
		Gson gson = new Gson();
		String websiteName=getConnDetail(origin);
		if(Application.checkWebsiteOrigin) {
			if (websiteName.equals("FillBasket")) {
				return gson.toJson(productJpaRespository.findById(id).get());
			} else {
				return gson.toJson("Unknown Request 404");
			}
		}
		else {
			return gson.toJson(productJpaRespository.findById(id).get());
		}
	}

	/**
	 * @param category
	 * @param request
	 * It's using to get Product detail by Category.
	 * @return
	 */
	@GetMapping("getProductByCategory/{category}")
	public String getProductByCategory(@PathVariable String category,HttpServletRequest request) {
		String origin = request.getHeader("origin");
		Gson gson = new Gson();
		String websiteName=getConnDetail(origin);
		if(Application.checkWebsiteOrigin) {
			if (websiteName.equals("FillBasket")) {
				return gson.toJson(productJpaRespository.findProductByCategory(category));
			} else {
				return gson.toJson("Unknown Request 404");
			}
		}
		else {
			return gson.toJson(productJpaRespository.findProductByCategory(category));
		}
	}

	/**
	 * @param id
	 * It's using to delete Product detail by Product Id.
	 */
	@DeleteMapping("/deleteProductById/{id}")
	public void deleteProductById(@PathVariable int id) {
        Product product=productJpaRespository.findById(id).get();
        deleteImageFromStorage(product);
		productJpaRespository.deleteById(id);
	}
	
	public void deleteImageFromStorage(Product product) {
		String bucket="fillbasket-aace0.appspot.com";
		//Delete First Image
		if(product.getProductImage1()!=null) {
			String object1=getObjectName(product.getProductImage1());
			BlobId blobId = BlobId.of(bucket, object1);
			storage.delete(blobId);
		}
		//Delete Second Image
		if(product.getProductImage2()!=null) {
			String object2=getObjectName(product.getProductImage2());
			BlobId blobId2 = BlobId.of(bucket, object2);
			storage.delete(blobId2);
		}
		//Delete Third Image
		if(product.getProductImage3()!=null) {
			String object3=getObjectName(product.getProductImage3());
			BlobId blobId3 = BlobId.of(bucket, object3);
			storage.delete(blobId3);
		}
	}
	
	public String getObjectName(String url) {
		String regex=url.split("/o/")[1].split("generation")[0];
		return regex.substring(0,regex.length()-1);
	}

	/**
	 * @param cart
	 * @param userId
	 * It's using to update Cart detail by using User Id.
	 * @return
	 */
	@PutMapping("/UpdateCartItem/{userId}")
	public String updateCartItem(@RequestBody Cart cart, @PathVariable int userId) {
		cartJpaRespository.save(cart);
		return getCartDetail(userId);
	}

	@PostMapping("/addProductIntoCart/{quantity}/{userId}")
	public void addProductIntoCart(@RequestBody Product product, @PathVariable int quantity, @PathVariable int userId) {
		double total = product.getProductPrice() * quantity;
		Cart cart = new Cart(1, product.getProductImage1(), product.getProductName(), product.getProductPrice(),
				quantity, total, userId, product.getId());
		cartJpaRespository.save(cart);
	}

	@GetMapping("/getCartDetail/{id}")
	public String getCartDetail(@PathVariable int id) {
		Gson gson = new Gson();
		return gson.toJson(cartJpaRespository.findCartByuserFk(id));
	}

	@GetMapping("/getCartDetailProduct/{productId}/{userId}")
	public String getCartDetailByProduct(@PathVariable int productId, @PathVariable int userId) {
		Gson gson = new Gson();
		return gson.toJson(cartJpaRespository.findCartByProductFkAndUserFk(productId, userId));
	}

	@DeleteMapping("/deleteCartItemById/{id}/{userId}")
	public String deleteCartItemById(@PathVariable int id, @PathVariable int userId) {
		cartJpaRespository.deleteById(id);
		return getCartDetail(userId);
	}

	public String uploadObject(String projectId, String bucketName, String objectName, byte[] bytes, String type) {
		//Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
		BlobId blobId = BlobId.of(bucketName, objectName);
		BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(type).build();
		storage.create(blobInfo, bytes);
		storage.createAcl(blobId, Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));
		Blob blob = storage.get(blobId);
		System.out.println("File uploaded to bucket " + bucketName + " as " + objectName);
		System.out.println("Media Link :- " + blob.getMediaLink());
		return blob.getMediaLink();
	}

	public static byte[] compressBytes(byte[] data) {
		Deflater deflater = new Deflater();
		deflater.setInput(data);
		deflater.finish();
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		while (!deflater.finished()) {
			int count = deflater.deflate(buffer);
			outputStream.write(buffer, 0, count);
		}
		try {
			outputStream.close();
		} catch (IOException e) {
		}
		System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
		return outputStream.toByteArray();
	}

	public static byte[] decompressBytes(byte[] data) {
		Inflater inflater = new Inflater();
		inflater.setInput(data);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		try {
			while (!inflater.finished()) {
				int count = inflater.inflate(buffer);
				outputStream.write(buffer, 0, count);
			}
			outputStream.close();
		} catch (IOException ioe) {
		} catch (DataFormatException e) {
		}
		return outputStream.toByteArray();
	}

	@GetMapping("/getOtp/{mobile}")
	public void getOtp(@PathVariable String mobile) {
		Random rand = new Random();
		otp = rand.nextInt(900000) + 100000;
		System.out.println("OTP :-  " + otp);
		URLConnection myURLConnection = null;
		URL myURL = null;
		BufferedReader reader = null;
		String mainUrl = "https://2factor.in/API/V1/e4713f51-e0f9-11e9-ade6-0200cd936042/SMS/";
		StringBuilder sbPostData = new StringBuilder(mainUrl);
		sbPostData.append(mobile);
		sbPostData.append("/");
		sbPostData.append(otp);
		sbPostData.append("/");
		sbPostData.append("E-commerce");
		mainUrl = sbPostData.toString();
		try {
			myURL = new URL(mainUrl);
			myURLConnection = myURL.openConnection();
			myURLConnection.connect();
			reader = new BufferedReader(new InputStreamReader(myURLConnection.getInputStream()));
			String success = "Your message sent sucessfully";
			System.out.println(success);
			System.out.println("OTP :-  " + otp);
			reader.close();
		} catch (IOException e) {

		}
	}

	@GetMapping("verifyOtp/{otp}")
	public String verifyOtp(@PathVariable int otp) {
		Gson gson = new Gson();
		if (this.otp == otp) {
			return gson.toJson("Verified");
		} else {
			return gson.toJson("Otp Not Verified !!");
		}
	}

	@PutMapping("setOrderDetail/{userId}")
	public void setOrderDetail(@RequestBody CheckoutDetail checkoutDetail, @PathVariable int userId) {
		User user = jpaRespository.findById(new Long(userId)).get();
		int id = 500000;
		List<Cart> cartItemsList = cartJpaRespository.findCartByuserFk(userId);
		for (int i = 0; i < cartItemsList.size(); i++) {
			id++;
			Cart loopCart = cartItemsList.get(i);
			Date date = new Date();
			Date expectedDate=null;
	        Calendar c = Calendar.getInstance();
	        c.setTime(date);
	        c.add(Calendar.DATE, 6);
	        expectedDate = c.getTime();
			int total = (int) (loopCart.getQuantity() * loopCart.getProductPrice());
			MyOrder myOrder = new MyOrder(id, checkoutDetail.getLine1(), checkoutDetail.getLine2(),
					checkoutDetail.getCity(), checkoutDetail.getState(), checkoutDetail.getPincode(),
					loopCart.getProductName(), loopCart.getProductPrice(), loopCart.getQuantity(), total, userId,
					loopCart.getProductImage1(), loopCart.getProductFk(),checkoutDetail.getStatus(),date,expectedDate);
			myOrderJpaRespository.save(myOrder);
			if (ApplicationSetup.allowOrderMsg) 
				sendOrderDetail(user.getUserName(), myOrder.getProductName(), String.valueOf(myOrder.getQuantity()),user.getUserPhoneNumber());
			cartJpaRespository.deleteById(loopCart.getId());
		}
	}

	@GetMapping("myOrderDetail/{userId}")
	public String myOrderDetail(@PathVariable int userId) {
		Gson gson = new Gson();
        List<MyOrder>orderList=myOrderJpaRespository.findMyOrderByuserFk(userId);
		List<MyOrder> sortedList = orderList.stream().sorted().collect(Collectors.toList());     
		return gson.toJson(sortedList);
	}
	

	@GetMapping("orderDetail/{Id}")
	public String orderDetail(@PathVariable String Id) {
		Gson gson = new Gson();
		return gson.toJson(myOrderJpaRespository.findById(Long.parseLong(Id)).get());
	}
	
	@GetMapping("allOrderDetails")
	public String allOrderDetails() {
		Gson gson = new Gson();
		return gson.toJson(myOrderJpaRespository.findAll());
	}
	
	@PutMapping("/UpdateOrder")
	public String updateOrder(@RequestBody OrderRequestJson orderJson) {
		@SuppressWarnings("deprecation")
		MyOrder order=new MyOrder(orderJson.id,orderJson.line1,orderJson.line2,orderJson.city,orderJson.state,orderJson.pincode,orderJson.productName
				,orderJson.productPrice,orderJson.quantity,orderJson.total,orderJson.userFk,orderJson.productImage1,orderJson.productFk,orderJson.status, 
				new Date(orderJson.orderedDate),new Date(orderJson.expectedDate));
		myOrderJpaRespository.save(order);
		return new Gson().toJson(myOrderJpaRespository.findAll());
	}

	public void sendOrderDetail(String name, String productName, String qunatity, String mobile) {
		String moreInfo = "https://fillbasket-aace0.firebaseapp.com/";
		URL url;
		try {
			url = new URL(ApplicationSetup.messageUrl);
			URLConnection con = url.openConnection();
			HttpURLConnection http = (HttpURLConnection) con;
			http.setRequestMethod("POST");
			http.setDoOutput(true);
			String body = "{\"From\":\"rajanr\",\"To\":\"" + mobile
					+ "\",\"TemplateName\":\"Order Template 1\",\"VAR1\":\"" + name + "\",\"VAR2\":\"" + productName
					+ "\",\"VAR3\":\"" + qunatity + "\",\"VAR4\":\"7\",\"VAR5\":\"" + moreInfo + "\"}";
			byte[] out = body.getBytes(StandardCharsets.UTF_8);
			int length = out.length;

			http.setFixedLengthStreamingMode(length);
			http.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
			http.connect();
			try (OutputStream os = http.getOutputStream()) {
				os.write(out);
			}
			System.out.println(http.getResponseMessage());
			String success = "Your message sent sucessfully";
			System.out.println(success);
			System.out.println(url);
			System.out.println(body);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@GetMapping("/home_page_detail")
	public List<HomePageDetail> homePageDetail() {
		return homePageRepo.findAll();
	}
	
	@GetMapping("/getApplicationSetup")
	public String getApplicationSetup() {
		ApplicationSetup applicationSetup=new ApplicationSetup();
		Gson gson=new Gson();
		return gson.toJson(applicationSetup.toString());
	}
	
	@GetMapping("/setData")
	public void setData() throws IOException {
		for(int i=31;i<32;i++) {
			String singleData=DBUtill.readFile("D:\\Workspace\\Test\\output"+i+"_final.txt");
			String[] singleDataArray=singleData.split("\n");
			for(int j=0;j<singleDataArray.length;j++) {
				UserData userData=new UserData(singleDataArray[j].split(":")[0].trim(),singleDataArray[j].split(":")[1].trim());	
				userDataJpaRespository.save(userData);
			}
		}
	}
	
	@GetMapping("/getUserData/{iden}")
	public void getUserData(String iden) throws IOException {
				//userDataJpaRespository.save(userData);
	}
	
	public String getConnDetail(String url) {
		URL obj;
		System.out.println(url);
		if(url!=null) {
			try {
				obj = new URL(url);
				HttpURLConnection con = (HttpURLConnection) obj.openConnection();
				con.setRequestMethod("GET");
				int responseCode = con.getResponseCode();
				if (responseCode == HttpURLConnection.HTTP_OK) { 
					BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
					String inputLine;
					StringBuffer response = new StringBuffer();
					while ((inputLine = in.readLine()) != null) {
						response.append(inputLine);
					}
					in.close();
					String responseString=response.toString();
					return responseString.split("<title>")[1].trim().split("</title>")[0].trim();
				} else {
					System.out.println("GET request not worked");
					return null;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public String decryptMessage(String encryptText, String encryptKey) {
		try {
			byte[] base64Decrypted = Base64.getDecoder().decode(encryptText);
			return decrypt(base64Decrypted, encryptKey);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public String decrypt(byte[] cipherText, String encryptionKey) throws Exception {
		Cipher cipher = Cipher.getInstance("AES/CBC/pkcs5padding", "SunJCE");
		SecretKeySpec key = new SecretKeySpec(encryptionKey.getBytes("UTF-8"), "AES");
		cipher.init(Cipher.DECRYPT_MODE, key, new IvParameterSpec("AODVNUASDNVVAOVF".getBytes("UTF-8")));
		return new String(cipher.doFinal(cipherText), "UTF-8");
	}
}

class OrderRequestJson {
	public long id;
	public String line1;
	public String line2;
	public String city;
	public String state;
	public long pincode;
	public String productName;
	public double productPrice;
	public int quantity;
	public double total;
	public int userFk;
	public String productImage1;
	public int productFk;
	public String status;
	public String orderedDate;
	public String expectedDate;
}

class Response {
	public String status;
	public Response(String status) {
		this.status=status;
		// TODO Auto-generated constructor stub
	}
}
