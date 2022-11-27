package com.rajan.ecommerce9.database.config;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rajan.ecommerce9.entity.MyOrder;

public interface MyOrderJpaRespository extends JpaRepository<MyOrder,Long> {
	
	List<MyOrder> findMyOrderByuserFk(int fk_user);

}
