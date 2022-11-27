package com.rajan.ecommerce9.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "order_detail")
public class MyOrder implements Comparable<MyOrder> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "address_line_1")
	private String line1;

	@Column(name = "address_line_2")
	private String line2;

	@Column(name = "city")
	private String city;

	@Column(name = "state")
	private String state;

	@Column(name = "pincode")
	private long pincode;

	@Column(name = "product_name")
	private String productName;

	@Column(name = "product_price")
	private double productPrice;

	@Column(name = "quantity")
	private int quantity;

	@Column(name = "total")
	private double total;

	@Column(name = "fk_user")
	private int userFk;

	@Column(name = "product_Image1")
	private String productImage1;

	@Column(name = "fk_product")
	private int productFk;
	
	@Column(name="status")
	private String status;
	
	@Column(name="order_date")
	private Date orderedDate;
	
	@Column(name="expected_date")
	private Date expectedDate;

	public MyOrder() {
	}

	public MyOrder(long id, String line1, String line2, String city, String state, long pincode,
			String productName, double productPrice, int quantity, double total, int userFk, String productImage1,
			int productFk,String status,Date orderedDate,Date expectedDate) {
		super();
		this.id = id;
		this.line1 = line1;
		this.line2 = line2;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
		this.productName = productName;
		this.productPrice = productPrice;
		this.quantity = quantity;
		this.total = total;
		this.userFk = userFk;
		this.productImage1 = productImage1;
		this.productFk = productFk;
		this.status=status;
		this.orderedDate=orderedDate;
		this.expectedDate=expectedDate;
	}

	public long getId() {
		return id;
	}

	public void setAddress_id(long id) {
		this.id = id;
	}

	public String getLine1() {
		return line1;
	}

	public void setLine1(String line1) {
		this.line1 = line1;
	}

	public String getLine2() {
		return line2;
	}

	public void setLine2(String line2) {
		this.line2 = line2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public long getPincode() {
		return pincode;
	}

	public void setPincode(long pincode) {
		this.pincode = pincode;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public double getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(double productPrice) {
		this.productPrice = productPrice;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public int getUserFk() {
		return userFk;
	}

	public void setUserFk(int userFk) {
		this.userFk = userFk;
	}

	public String getProductImage1() {
		return productImage1;
	}

	public void setProductImage1(String productImage1) {
		this.productImage1 = productImage1;
	}

	public int getProductFk() {
		return productFk;
	}

	public void setProductFk(int productFk) {
		this.productFk = productFk;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getOrderedDate() {
		return orderedDate;
	}

	public void setOrderedDate(Date orderedDate) {
		this.orderedDate = orderedDate;
	}

	public Date getExpectedDate() {
		return expectedDate;
	}

	public void setExpectedDate(Date expectedDate) {
		this.expectedDate = expectedDate;
	}

	@Override
	public int compareTo(MyOrder o) {
		if(this.getOrderedDate()!=null) {
			System.out.println(this.getOrderedDate());
		    return this.getOrderedDate().compareTo(o.getOrderedDate());
		}
		else {
			return 0;
		}
	}
	
}
