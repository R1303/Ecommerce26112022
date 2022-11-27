package com.rajan.ecommerce9.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user_data")
public class UserData {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public long id;
	@Column(name = "iden_no")
	public String iden_no;
	@Column(name = "enrypted_Data")
	public String enryptedData;

	public UserData(String iden_no, String enryptedData) {
		super();
		this.iden_no = iden_no;
		this.enryptedData = enryptedData;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getIden_no() {
		return iden_no;
	}

	public void setIden_no(String iden_no) {
		this.iden_no = iden_no;
	}

	public String getEnryptedData() {
		return enryptedData;
	}

	public void setEnryptedData(String enryptedData) {
		this.enryptedData = enryptedData;
	}

}
