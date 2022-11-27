package com.rajan.ecommerce9.jwt.resources;
@SuppressWarnings("serial")
public class AuthenticationException extends RuntimeException {
	public AuthenticationException(String message, Throwable cause) {
		super(message, cause);
	}
}
