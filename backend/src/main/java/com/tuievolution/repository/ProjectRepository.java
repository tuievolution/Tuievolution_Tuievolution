package com.tuievolution.repository;

import com.tuievolution.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
// JpaRepository sayesinde findAll(), save(), deleteById() gibi metotlar hazır gelir.
public interface ProjectRepository extends JpaRepository<Project, Long> {
}