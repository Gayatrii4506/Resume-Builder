package com.resumebuilder.service;

import com.resumebuilder.model.Resume;
import com.resumebuilder.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResumeService {
    
    @Autowired
    private ResumeRepository resumeRepository;
    
    public List<Resume> getAllResumes() {
        return resumeRepository.findAll();
    }
    
    public Optional<Resume> getResumeById(Long id) {
        return resumeRepository.findById(id);
    }
    
    public Resume createResume(Resume resume) {
        return resumeRepository.save(resume);
    }
    
    public Resume updateResume(Long id, Resume resumeDetails) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resume not found with id: " + id));
        
        resume.setFullName(resumeDetails.getFullName());
        resume.setEmail(resumeDetails.getEmail());
        resume.setPhone(resumeDetails.getPhone());
        resume.setAddress(resumeDetails.getAddress());
        resume.setSummary(resumeDetails.getSummary());
        resume.setEducation(resumeDetails.getEducation());
        resume.setExperience(resumeDetails.getExperience());
        resume.setSkills(resumeDetails.getSkills());
        
        return resumeRepository.save(resume);
    }
    
    public void deleteResume(Long id) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resume not found with id: " + id));
        resumeRepository.delete(resume);
    }
} 