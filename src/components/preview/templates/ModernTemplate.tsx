
import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { Resume } from "@/types";

interface ModernTemplateProps {
  resume: Resume;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resume }) => {
  const { personalInfo, summary, experience, education, skills } = resume.content;
  
  return (
    <div className="font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">{personalInfo.fullName}</h1>
        <h2 className="text-xl text-muted-foreground mb-3">{personalInfo.jobTitle}</h2>
        
        <div className="flex flex-wrap gap-3 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4 text-primary" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-primary" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4 text-primary" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4 text-primary" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-primary border-b border-primary pb-1 mb-2">Summary</h3>
          <p>{summary}</p>
        </div>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-primary border-b border-primary pb-1 mb-3">Experience</h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{exp.title}</h4>
                    <h5>{exp.company}, {exp.location}</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                </div>
                
                {exp.description && <p className="mt-1 mb-2">{exp.description}</p>}
                
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
          <h3 className="text-lg font-bold text-primary border-b border-primary pb-1 mb-3">Education</h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{edu.degree}</h4>
                    <h5>{edu.institution}, {edu.location}</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">{edu.startDate} - {edu.endDate}</p>
                </div>
                
                {edu.gpa && <p className="mt-1">GPA: {edu.gpa}</p>}
                {edu.description && <p className="mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-primary border-b border-primary pb-1 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, index) => (
              <span key={index} className="bg-muted px-2 py-1 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;
