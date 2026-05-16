package com.tuievolution.controller;

import com.tuievolution.model.User;
import com.tuievolution.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest; // Spring Boot 3.x için jakarta kullanılır
import java.util.Map;
import java.util.Optional;

// Frontend'in adresi CORS için buraya eklenmeli
@CrossOrigin(origins = "https://tuievolution.vercel.app", allowCredentials = "true")
@RestController
@RequestMapping("/api/users")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // --- KAYIT OLMA (REGISTER) ---
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user, HttpServletRequest request) {
        
        // --- 🚨 TEST LOGLARI (Docker Terminalinde Görünecek) ---
        System.out.println("====================================");
        System.out.println("🔔 YENİ KAYIT İSTEĞİ GELDİ!");
        System.out.println("📍 İsteği Gönderen IP: " + request.getRemoteAddr());
        System.out.println("📧 Kaydedilecek Email: " + user.getEmail());
        System.out.println("====================================");

        // 1. E-posta zaten var mı kontrol et
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            System.out.println("❌ HATA: Bu e-posta zaten kullanımda.");
            return ResponseEntity.badRequest().body(Map.of("message", "Bu e-posta zaten kullanımda!"));
        }
        
        // 2. Kullanıcıyı kaydet (Şifreyi olduğu gibi kaydediyoruz)
        User savedUser = userRepository.save(user);
        System.out.println("✅ BAŞARILI: Kullanıcı veritabanına kaydedildi -> " + savedUser.getId());
        return ResponseEntity.ok(savedUser);
    }

    // --- GİRİŞ YAPMA (LOGIN) ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData, HttpServletRequest request) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        // --- 🚨 TEST LOGLARI (Docker Terminalinde Görünecek) ---
        System.out.println("====================================");
        System.out.println("🔑 YENİ GİRİŞ İSTEĞİ GELDİ!");
        System.out.println("📍 İsteği Gönderen IP: " + request.getRemoteAddr());
        System.out.println("📧 Giriş Yapmaya Çalışan Email: " + email);
        System.out.println("====================================");

        // 1. Kullanıcıyı bul
        Optional<User> user = userRepository.findByEmail(email);

        // 2. Kullanıcı varsa VE şifre birebir eşleşiyorsa
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            System.out.println("✅ BAŞARILI: Kullanıcı girişi onaylandı.");
            user.get().setPassword(null); 
            return ResponseEntity.ok(user.get());
        }
        
        System.out.println("❌ HATA: E-posta veya şifre hatalı.");
        return ResponseEntity.status(401).body(Map.of("message", "E-posta veya şifre hatalı!"));
    }
    // --- KULLANICI BİLGİLERİNİ ID İLE GETİRME (PROFİL SAYFASI İÇİN) ---
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        // 1. Veritabanından o ID'ye sahip kullanıcıyı ara
        Optional<User> user = userRepository.findById(id);

        // 2. Eğer kullanıcı bulunduysa
        if (user.isPresent()) {
            // Şifreyi frontend'e geri göndermek güvenlik açığıdır, onu siliyoruz
            user.get().setPassword(null); 
            return ResponseEntity.ok(user.get());
        }
        
        // 3. Kullanıcı yoksa 404 döndür
        return ResponseEntity.status(404).body(Map.of("message", "Kullanıcı bulunamadı!"));
    }
}