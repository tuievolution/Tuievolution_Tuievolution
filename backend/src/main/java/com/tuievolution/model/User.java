package com.tuievolution.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "users")
@Data // Lombok: Getter, Setter, ToString otomatik oluşturur
@NoArgsConstructor // Parametresiz constructor
@AllArgsConstructor // Tüm alanları içeren constructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String full_Name;
}