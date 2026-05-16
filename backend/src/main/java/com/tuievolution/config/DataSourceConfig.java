package com.tuievolution.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    // application.properties dosyasındaki değerleri (Docker'dan gelen) çekiyoruz
    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUser;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    @Bean
    public DataSource dataSource() {
        System.out.println("====================================");
        System.out.println("🚀 DOCKER MODU AKTİF!");
        System.out.println("🔌 Bağlanılan Veritabanı: " + dbUrl);
        System.out.println("====================================");

        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl(dbUrl);
        dataSource.setUsername(dbUser);
        dataSource.setPassword(dbPassword);
        dataSource.setDriverClassName("org.postgresql.Driver");
        
        return dataSource;
    }
}