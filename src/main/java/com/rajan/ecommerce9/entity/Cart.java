package com.rajan.ecommerce9.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cart_detail")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "product_Image1")
	private String productImage1;

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
	
	@Column(name = "fk_product")
	private int productFk;

	
	public Cart() {}
	
	public Cart(int id, String productImage1, String productName, double productPrice, int quantity, double total,
			int userFk, int productFk) {
		super();
		this.id = id;
		this.productImage1 = productImage1;
		this.productName = productName;
		this.productPrice = productPrice;
		this.quantity = quantity;
		this.total = total;
		this.userFk = userFk;
		this.productFk = productFk;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProductImage1() {
		return productImage1;
	}

	public void setProductImage1(String productImage1) {
		this.productImage1 = productImage1;
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

	public int getProductFk() {
		return productFk;
	}

	public void setProductFk(int productFk) {
		this.productFk = productFk;
	}
}
