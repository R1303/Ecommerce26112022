package com.rajan.ecommerce9.database.config;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rajan.ecommerce9.entity.Product;
@Repository
public interface ProductJpaRespository extends JpaRepository<Product,Integer> {
	List<Product> findAll();
	List<Product>findProductByCategory(String category);
}
