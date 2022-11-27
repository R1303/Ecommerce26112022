package com.rajan.ecommerce9.database.config;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rajan.ecommerce9.entity.User;
@Repository
public interface UserJpaRespository extends JpaRepository<User,Long> {

	List<User> findByuserName(String userName);
	List<User> findAll();

}
