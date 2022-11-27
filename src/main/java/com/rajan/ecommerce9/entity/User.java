package com.rajan.ecommerce9.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="user_detail")
public class User {
	
	public User(long id, String userName, String userEmail, String userPhoneNumber, String userPassword) {
		super();
		this.id = id;
		this.userName = userName;
		this.userEmail = userEmail;
		this.userPhoneNumber = userPhoneNumber;
		this.userPassword = userPassword;
	}
	public User(){}

	@Id
	  @GeneratedValue(strategy=GenerationType.IDENTITY)
	  private long id;
	  
	  @Column(name = "user_name" )
    private String userName;
	  
	  @Column(name="user_email")
    private String userEmail;
	  
	  @Column(name = "user_mobileno")
    private String userPhoneNumber;
	  
	  @Column(name="user_password")
    private String userPassword;
	  
	 

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	
	public String getUserPhoneNumber() {
		return userPhoneNumber;
	}

	public void setUserPhoneNumber(String userPhoneNumber) {
		this.userPhoneNumber = userPhoneNumber;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	
}
