package com.rajan.ecommerce9.database.config;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rajan.ecommerce9.entity.Cart;
public interface CartJpaRespository extends JpaRepository<Cart,Integer>{
	List<Cart> findAll();
	List<Cart> findCartByuserFk(int fk_user);
	List<Cart> findCartByProductFkAndUserFk(int fk_product,int fk_user);

}
