package com.rajan.ecommerce9.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="home_page_detail")
public class HomePageDetail {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	private String header_image;
	private String category_image_1;
	private String category_image_2;
	private String category_image_3;
	private String category_image_4;
	private String offer_detail_image;
	private String offer_detail_price;
	private String offer_detail_text;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getHeader_image() {
		return header_image;
	}
	public void setHeader_image(String header_image) {
		this.header_image = header_image;
	}
	public String getCategory_image_1() {
		return category_image_1;
	}
	public void setCategory_image_1(String category_image_1) {
		this.category_image_1 = category_image_1;
	}
	public String getCategory_image_2() {
		return category_image_2;
	}
	public void setCategory_image_2(String category_image_2) {
		this.category_image_2 = category_image_2;
	}
	public String getCategory_image_3() {
		return category_image_3;
	}
	public void setCategory_image_3(String category_image_3) {
		this.category_image_3 = category_image_3;
	}
	public String getCategory_image_4() {
		return category_image_4;
	}
	public void setCategory_image_4(String category_image_4) {
		this.category_image_4 = category_image_4;
	}
	public String getOffer_detail_image() {
		return offer_detail_image;
	}
	public void setOffer_detail_image(String offer_detail_image) {
		this.offer_detail_image = offer_detail_image;
	}
	public String getOffer_detail_price() {
		return offer_detail_price;
	}
	public void setOffer_detail_price(String offer_detail_price) {
		this.offer_detail_price = offer_detail_price;
	}
	public String getOffer_detail_text() {
		return offer_detail_text;
	}
	public void setOffer_detail_text(String offer_detail_text) {
		this.offer_detail_text = offer_detail_text;
	}
}
