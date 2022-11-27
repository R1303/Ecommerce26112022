package com.rajan.ecommerce9.jwt.resources;

import java.io.Serializable;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class JwtTokenRequest implements Serializable {

	private static final long serialVersionUID = -5616176897013108345L;

	private String username;
	private String password;
	private String email;
	private String phone;
	private String isRegister;
	
	

	public JwtTokenRequest() {
		super();
	}

	public JwtTokenRequest(String username, String password,String email,String phone,String isRegister) {
		 System.out.println("JwtTokenRequest............"+isRegister);
		 System.out.println("JwtTokenRequest............"+email);
		 System.out.println("JwtTokenRequest............"+phone);
		 System.out.println("JwtTokenRequest............"+password);
		this.setUsername(username);
		this.setPassword(password);
		this.setEmail(email);
		this.setPhone(phone);
		this.setIsRegister(isRegister);
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return decryptMessage(this.password, "mykey#91mykey#91");
	}

	public void setPassword(String password) {
		this.password = password;
	}
	

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
   
	
	public String isRegister() {
		return isRegister;
	}

	public void setIsRegister(String isRegister) {
		this.isRegister = isRegister;
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
