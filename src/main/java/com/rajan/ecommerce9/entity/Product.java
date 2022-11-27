package com.rajan.ecommerce9.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "product_detail")
public class Product {
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "product_name")
	private String productName;

	@Column(name = "product_price")
	private Double productPrice;

	@Column(name = "description")
	private String description;

	@Column(name = "category")
	private String category;

	@Column(name = "product_Image1", length = 420000)
	private String productImage1;

	@Column(name = "product_Image2", length = 420000)
	private String productImage2;

	@Column(name = "product_Image3", length = 420000)
	private String productImage3;

	public Product() {
	}

	public Product(int id,String productName, Double productPrice, String description, String category, String productImage1,
			String productImage2, String productImage3) {
		super();
		this.id=id;
		this.productName = productName;
		this.productPrice = productPrice;
		this.description = description;
		this.category = category;
		this.productImage1 = productImage1;
		this.productImage2 = productImage2;
		this.productImage3 = productImage3;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Double getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(Double productPrice) {
		this.productPrice = productPrice;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getProductImage1() {
		return productImage1;
	}

	public void setProductImage1(String productImage1) {
		this.productImage1 = productImage1;
	}

	public String getProductImage2() {
		return productImage2;
	}

	public void setProductImage2(String productImage2) {
		this.productImage2 = productImage2;
	}

	public String getProductImage3() {
		return productImage3;
	}

	public void setProductImage3(String productImage3) {
		this.productImage3 = productImage3;
	}

	public Product getObject() {
		return this;
	}
}
