export interface Resume {
  id: string;
  name: string;
  lastUpdated: Date;
  content: ResumeContent;
}

export interface ResumeContent {
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  projects: ProjectItem[];
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  photoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description?: string;
  gpa?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Fluent" | "Native";
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate: string;
  endDate: string | "Present";
}

export interface User {
  id: string;
  name: string;
  email: string;
  resumes: Resume[];
}

export interface AiSuggestion {
  id: string;
  text: string;
  type: "improvement" | "addition" | "removal" | "rewrite";
  section: keyof ResumeContent | "general";
  itemId?: string;
}

export type ResumeTemplate = 
  | "modern-blue"
  | "modern-green"
  | "professional-maroon"
  | "creative-purple"
  | "minimal-gray"
  | "executive-black"
  | "modern-orange"
  | "creative-teal";

export interface TemplateColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface JobDescription {
  id: string;
  title: string;
  company: string;
  description: string;
  keywords: string[];
  matchScore?: number;
}
