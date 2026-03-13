package com.tuievolution.service;

import com.tuievolution.model.Project;
import com.tuievolution.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired // Repository'yi buraya bağla (Enjekte et).
    private ProjectRepository projectRepository;

    // Tüm projeleri getir
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Yeni proje kaydet
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }
}