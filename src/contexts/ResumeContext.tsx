import React, { createContext, useContext, useState, ReactNode } from "react";
import { Resume, ResumeContent, AiSuggestion, JobDescription, ResumeTemplate, TemplateColors } from "../types";
import { v4 as uuidv4 } from "uuid";
import { templateConfigs } from "@/config/templateConfig";

interface ResumeContextType {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
  updateResumeContent: (content: Partial<ResumeContent>) => void;
  suggestions: AiSuggestion[];
  setSuggestions: React.Dispatch<React.SetStateAction<AiSuggestion[]>>;
  jobDescription: JobDescription | null;
  setJobDescription: React.Dispatch<React.SetStateAction<JobDescription | null>>;
  activeTemplate: ResumeTemplate;
  setActiveTemplate: React.Dispatch<React.SetStateAction<ResumeTemplate>>;
  templateColors: TemplateColors;
  setTemplateColors: React.Dispatch<React.SetStateAction<TemplateColors>>;
  savedResumes: Resume[];
  saveCurrentResume: () => void;
  loadResume: (id: string) => void;
  createNewResume: () => void;
}

const defaultResumeContent: ResumeContent = {
  personalInfo: {
    fullName: "Alex Johnson",
    jobTitle: "Software Developer",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    linkedin: "linkedin.com/in/alexjohnson",
    website: "alexjohnson.dev",
  },
  summary: "Experienced software developer with a passion for creating elegant, efficient solutions. Skilled in full-stack development with expertise in React, Node.js, and cloud technologies.",
  experience: [
    {
      id: uuidv4(),
      title: "Senior Software Developer",
      company: "Tech Innovations Inc.",
      location: "New York, NY",
      startDate: "2020-01",
      endDate: "Present",
      description: "Lead developer for client-facing web applications",
      highlights: [
        "Developed and maintained multiple React-based web applications",
        "Implemented CI/CD pipelines reducing deployment time by 40%",
        "Mentored junior developers and conducted code reviews",
        "Optimized database queries resulting in 30% performance improvement"
      ]
    }
  ],
  education: [
    {
      id: uuidv4(),
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      location: "Boston, MA",
      startDate: "2012-09",
      endDate: "2016-05",
      gpa: "3.8"
    }
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "AWS", "Docker", "GraphQL", "SQL", "MongoDB", "Git"],
  certifications: [
    {
      id: uuidv4(),
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2021-06",
      url: "https://aws.amazon.com/certification/"
    }
  ],
  languages: [
    {
      id: uuidv4(),
      language: "English",
      proficiency: "Native"
    }
  ],
  projects: [
    {
      id: uuidv4(),
      name: "E-commerce Platform",
      description: "Developed a full-stack e-commerce platform with React and Node.js",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      startDate: "2019-03",
      endDate: "2019-09"
    }
  ]
};

const defaultResume: Resume = {
  id: uuidv4(),
  name: "My Resume",
  lastUpdated: new Date(),
  content: defaultResumeContent
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resume, setResume] = useState<Resume>(defaultResume);
  const [suggestions, setSuggestions] = useState<AiSuggestion[]>([]);
  const [jobDescription, setJobDescription] = useState<JobDescription | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<ResumeTemplate>("modern-blue");
  const [templateColors, setTemplateColors] = useState<TemplateColors>(templateConfigs["modern-blue"]);
  const [savedResumes, setSavedResumes] = useState<Resume[]>([defaultResume]);

  const updateResumeContent = (content: Partial<ResumeContent>) => {
    setResume(prev => ({
      ...prev,
      content: { ...prev.content, ...content },
      lastUpdated: new Date()
    }));
  };

  const saveCurrentResume = () => {
    const updatedResume = { ...resume, lastUpdated: new Date() };
    setSavedResumes(prev => {
      const index = prev.findIndex(r => r.id === resume.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = updatedResume;
        return updated;
      } else {
        return [...prev, updatedResume];
      }
    });
    setResume(updatedResume);
  };

  const loadResume = (id: string) => {
    const found = savedResumes.find(r => r.id === id);
    if (found) {
      setResume(found);
    }
  };

  const createNewResume = () => {
    const newResume: Resume = {
      id: uuidv4(),
      name: "Untitled Resume",
      lastUpdated: new Date(),
      content: defaultResumeContent
    };
    setSavedResumes(prev => [...prev, newResume]);
    setResume(newResume);
  };

  return (
    <ResumeContext.Provider value={{
      resume,
      setResume,
      updateResumeContent,
      suggestions,
      setSuggestions,
      jobDescription,
      setJobDescription,
      activeTemplate,
      setActiveTemplate,
      templateColors,
      setTemplateColors,
      savedResumes,
      saveCurrentResume,
      loadResume,
      createNewResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
