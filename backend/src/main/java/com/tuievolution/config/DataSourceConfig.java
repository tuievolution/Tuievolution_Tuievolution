package com.tuievolution.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        String isRender = System.getenv("IS_RENDER"); 

        // --- BULUT (NEONTECH) BİLGİLERİ (YEDEK VE CANLI ORTAM) ---
        String neonUrl = "jdbc:postgresql://ep-polished-mode-a9jg681z.gwc.azure.neon.tech/neondb?sslmode=require";
        String neonUser = "neondb_owner";
        String neonPass = "npg_khVI2ufeLG0F";

        // Render üzerindeyse direkt NeonTech'e bağlan (Bekleme yapma)
        if ("true".equals(isRender)) {
            System.out.println("☁️ PRODUCTION MODU: Render üzerinde çalışıyor. Direkt NeonTech'e bağlanılıyor...");
            return createDataSource(neonUrl, neonUser, neonPass);
        }

        // --- ORTAK GELİŞTİRME SUNUCUSU (DOCKER) BİLGİLERİ ---
        String serverIp = "192.168.5.17"; 
        String localUrl = "jdbc:postgresql://" + serverIp + ":5432/postgres";
        String localUser = "postgres";
        String localPass = "sunucudaki_docker_sifresi"; 

        try {
            // Ortak sunucuya ping at (Maksimum 3 saniye bekle)
            DriverManager.setLoginTimeout(3);
            try (Connection conn = DriverManager.getConnection(localUrl, localUser, localPass)) {
                System.out.println("✅ EKİP MODU: Ortak geliştirme sunucusuna (" + serverIp + ") bağlanıldı.");
                return createDataSource(localUrl, localUser, localPass);
            }
        } catch (Exception e) {
            // Sunucu kapalıysa, ağda sorun varsa veya internet yoksa Neon'a geç!
            System.err.println("⚠️ UYARI: Ortak geliştirme sunucusuna ulaşılamadı! Yedek olarak NeonTech'e geçiliyor...");
            return createDataSource(neonUrl, neonUser, neonPass);
        }
    }

    private DataSource createDataSource(String url, String username, String password) {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setDriverClassName("org.postgresql.Driver");
        return dataSource;
    }
}