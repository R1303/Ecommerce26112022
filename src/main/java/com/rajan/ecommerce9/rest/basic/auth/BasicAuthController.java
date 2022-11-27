package com.rajan.ecommerce9.rest.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin
@RestController
public class BasicAuthController {
	@GetMapping(path = "/basicAuth")
	public AuthenticationClass action() {
		return new AuthenticationClass("You Are Authenticated");
	}
}

class AuthenticationClass {
	String msg;
	public AuthenticationClass() {}
	public AuthenticationClass(String msg) {
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