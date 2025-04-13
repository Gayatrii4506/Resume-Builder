
import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { Resume } from "@/types";

interface ProfessionalTemplateProps {
  resume: Resume;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ resume }) => {
  const { personalInfo, summary, experience, education, skills } = resume.content;
  
  return (
    <div className="font-serif">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold uppercase tracking-wider mb-1">{personalInfo.fullName}</h1>
        <h2 className="text-lg text-muted-foreground mb-3">{personalInfo.jobTitle}</h2>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-wider mb-2">Professional Summary</h3>
          <p>{summary}</p>
        </div>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-wider mb-3">Professional Experience</h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <h4 className="font-bold">{exp.title}</h4>
                  <p className="text-sm text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                </div>
                <h5 className="font-medium mb-1">{exp.company}, {exp.location}</h5>
                
                {exp.description && <p className="mb-2">{exp.description}</p>}
                
                {exp.highlights.length > 0 && (
                  <ul className="list-disc ml-5 space-y-1">
                    {exp.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-wider mb-3">Education</h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <h4 className="font-bold">{edu.degree}</h4>
                  <p className="text-sm text-muted-foreground">{edu.startDate} - {edu.endDate}</p>
                </div>
                <h5 className="font-medium mb-1">{edu.institution}, {edu.location}</h5>
                
                {edu.gpa && <p>GPA: {edu.gpa}</p>}
                {edu.description && <p>{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wider mb-2">Skills</h3>
          <p>{skills.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
