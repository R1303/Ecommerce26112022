package com.rajan.ecommerce9.helper;

public class CheckoutDetail {
	public String name;
	public String line1;
	public String line2;
	public String city;
	public String state;
	public int pincode;
	public double subtotal;
	public int couponAmount;
	public String couponString;
	public int deliveryCharge;
	public boolean isCouponApplied;
	public String status;

	public CheckoutDetail(String name, String line1, String line2, String city, String state, int pincode,
			double subtotal, int couponAmount, String couponString, int deliveryCharge, boolean isCouponApplied,String status) {
		super();
		this.name = name;
		this.line1 = line1;
		this.line2 = line2;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
		this.subtotal = subtotal;
		this.couponAmount = couponAmount;
		this.couponString = couponString;
		this.deliveryCharge = deliveryCharge;
		this.isCouponApplied = isCouponApplied;
		this.status=status;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public int getPincode() {
		return pincode;
	}

	public void setPincode(int pincode) {
		this.pincode = pincode;
	}

	public double getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(double subtotal) {
		this.subtotal = subtotal;
	}

	public int getCouponAmount() {
		return couponAmount;
	}

	public void setCouponAmount(int couponAmount) {
		this.couponAmount = couponAmount;
	}

	public String getCouponString() {
		return couponString;
	}

	public void setCouponString(String couponString) {
		this.couponString = couponString;
	}

	public int getDeliveryCharge() {
		return deliveryCharge;
	}

	public void setDeliveryCharge(int deliveryCharge) {
		this.deliveryCharge = deliveryCharge;
	}

	public boolean isCouponApplied() {
		return isCouponApplied;
	}

	public void setCouponApplied(boolean isCouponApplied) {
		this.isCouponApplied = isCouponApplied;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
