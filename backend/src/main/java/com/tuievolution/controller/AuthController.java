package com.tuievolution.controller;

import com.tuievolution.model.User;
import com.tuievolution.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> register(@RequestBody User user) {
        // 1. E-posta zaten var mı kontrol et
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Bu e-posta zaten kullanımda!"));
        }
        
        // 2. Kullanıcıyı kaydet (Şifreyi olduğu gibi kaydediyoruz)
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    // --- GİRİŞ YAPMA (LOGIN) ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        // 1. Kullanıcıyı bul
        Optional<User> user = userRepository.findByEmail(email);

        // 2. Kullanıcı varsa VE şifre birebir eşleşiyorsa (Örn: "123456")
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            // Şifreyi frontend'e geri göndermek güvenlik açığıdır, onu siliyoruz
            user.get().setPassword(null); 
            return ResponseEntity.ok(user.get());
        }
        
        return ResponseEntity.status(401).body(Map.of("message", "E-posta veya şifre hatalı!"));
    }
}