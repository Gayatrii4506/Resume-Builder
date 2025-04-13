
import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { Resume } from "@/types";

interface CreativeTemplateProps {
  resume: Resume;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ resume }) => {
  const { personalInfo, summary, experience, education, skills } = resume.content;
  
  return (
    <div className="font-sans grid grid-cols-3 gap-6">
      {/* Left Sidebar */}
      <div className="col-span-1 bg-gradient-to-b from-primary to-secondary text-white p-6 rounded-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">{personalInfo.fullName}</h1>
          <h2 className="text-md opacity-90 mb-4">{personalInfo.jobTitle}</h2>
          
          <div className="space-y-2 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3 border-b border-white/30 pb-1">Skills</h3>
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <div key={index} className="bg-white/10 px-3 py-1.5 rounded-full text-sm">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="col-span-2 p-2">
        {/* Summary */}
        {summary && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-primary mb-2">Professional Summary</h3>
            <p>{summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-primary mb-3">Work Experience</h3>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-primary/30">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5"></div>
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold">{exp.title}</h4>
                      <p className="text-sm text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <h5 className="text-secondary-foreground mb-1">{exp.company}, {exp.location}</h5>
                    
                    {exp.description && <p className="mb-2 text-sm">{exp.description}</p>}
                    
                    {exp.highlights.length > 0 && (
                      <ul className="list-disc ml-5 space-y-1 text-sm">
                        {exp.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-primary mb-3">Education</h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-4 border-l-2 border-primary/30">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5"></div>
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold">{edu.degree}</h4>
                      <p className="text-sm text-muted-foreground">{edu.startDate} - {edu.endDate}</p>
                    </div>
                    <h5 className="text-secondary-foreground mb-1">{edu.institution}, {edu.location}</h5>
                    
                    {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                    {edu.description && <p className="text-sm">{edu.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;
