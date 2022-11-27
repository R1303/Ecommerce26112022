package com.rajan.ecommerce9.database.config;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rajan.ecommerce9.entity.HomePageDetail;

public interface homePageRepo extends JpaRepository<HomePageDetail,Long>{

}
