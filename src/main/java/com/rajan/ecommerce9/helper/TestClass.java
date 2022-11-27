package com.rajan.ecommerce9.helper;

public class TestClass {
	String msg;
	public TestClass() {
	}
	public TestClass(String msg) {
		this.msg = msg;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	@Override
	public String toString() {
		return "TestClass [msg=" + msg + "]";
	}
}
