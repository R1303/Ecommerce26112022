package com.rajan.ecommerce9.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="address_detail")
public class Address {
	@Id
	  @GeneratedValue(strategy=GenerationType.IDENTITY)
	  private long address_id;
	  
	  @Column(name = "address_line_1" )
    private String address_line_1;
	  
	  @Column(name="address_line_2")
    private String address_line_2;
	  
	  @Column(name = "city")
    private String city;
	  
	  @Column(name="state")
    private String state;
	  
	  @Column(name="pincode")
	  private long pincode;
    
	  @Column(name="user_id")
	  private long userId;
	  
	  @Column(name="address_type")
	  private String address_type;

	public long getaddress_id() {
		return address_id;
	}

	public void setaddress_id(long address_id) {
		this.address_id = address_id;
	}

	

	public String getAddress_line_1() {
		return address_line_1;
	}

	public void setAddress_line_1(String address_line_1) {
		this.address_line_1 = address_line_1;
	}

	public String getAddress_line_2() {
		return address_line_2;
	}

	public void setAddress_line_2(String address_line_2) {
		this.address_line_2 = address_line_2;
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

	public long getUserId() {
		return userId;
	}

	public void setUserId(long user_id) {
		this.userId = user_id;
	}

	public String getAddress_type() {
		return address_type;
	}

	public void setAddress_type(String address_type) {
		this.address_type = address_type;
	}

}
