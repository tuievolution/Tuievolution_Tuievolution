package com.tuievolution.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "team_members")
@Data
public class TeamMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 1000) // 100 kelimeye yetecek kadar alan
    private String description;

    @ElementCollection // Skilleri ayrı bir alt tabloda liste olarak tutar
    private List<String> coreSkills;

    private String githubUrl;
    private String linkedinUrl;
    private String cvPdfUrl; // PDF dosyasının yolu
}