package com.tuievolution.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    // Veritabanındaki 'stack' sütunu (Örn: "React, Java, SQL")
    private String stack; 

    // Veritabanındaki 'image_url' sütunu ile eşleşir
    @Column(name = "image_url")
    private String imageUrl;

    // Veritabanındaki 'github_link' sütunu ile eşleşir
    @Column(name = "github_link")
    private String githubLink;

    // Veritabanındaki 'project_link' sütunu ile eşleşir
    @Column(name = "project_link")
    private String projectLink;
}