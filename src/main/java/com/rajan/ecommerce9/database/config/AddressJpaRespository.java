package com.rajan.ecommerce9.database.config;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rajan.ecommerce9.entity.Address;

public interface AddressJpaRespository extends JpaRepository<Address,Long> {
	List<Address> findAll();
	List<Address> findAddressByuserId(long user_id);
}
