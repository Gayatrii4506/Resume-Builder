package com.resumebuilder.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "resumes")
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String fullName;
    private String email;
    private String phone;
    private String address;
    
    @Column(length = 1000)
    private String summary;
    
    @Column(length = 2000)
    private String education;
    
    @Column(length = 2000)
    private String experience;
    
    @Column(length = 1000)
    private String skills;
    
    private LocalDate createdAt;
    private LocalDate updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDate.now();
        updatedAt = LocalDate.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDate.now();
    }
} 