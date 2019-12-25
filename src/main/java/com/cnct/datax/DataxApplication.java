package com.cnct.datax;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.cnct.datax")
@MapperScan("com.cnct.datax.dao")
public class DataxApplication {

	public static void main(String[] args) {
		SpringApplication.run(DataxApplication.class, args);
	}

}
