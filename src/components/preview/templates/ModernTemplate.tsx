import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { Resume } from "@/types";
import { useResume } from "@/contexts/ResumeContext";
import { Avatar } from "@/components/ui/avatar";

interface ModernTemplateProps {
  resume: Resume;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resume }) => {
  const { personalInfo, summary, experience, education, skills } = resume.content;
  const { templateColors } = useResume();

  const styles = {
    container: {
      fontFamily: "sans-serif",
      backgroundColor: templateColors.background,
      color: templateColors.text,
    },
    header: {
      borderBottom: `2px solid ${templateColors.primary}`,
      padding: "1.5rem",
    },
    section: {
      borderLeft: `3px solid ${templateColors.accent}`,
      marginBottom: "1.5rem",
      paddingLeft: "1rem",
    },
    title: {
      color: templateColors.primary,
      borderBottom: `2px solid ${templateColors.secondary}`,
      display: "inline-block",
      marginBottom: "0.5rem",
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header} className="flex items-start gap-6">
        {personalInfo.photoUrl && (
          <div className="flex-shrink-0">
            <Avatar className="w-32 h-32 border-4" style={{ borderColor: templateColors.primary }}>
              <img 
                src={personalInfo.photoUrl} 
                alt={personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            </Avatar>
          </div>
        )}
        
        <div className="flex-grow">
          <h1 className="text-3xl font-bold" style={{ color: templateColors.primary }}>
            {personalInfo.fullName}
          </h1>
          <h2 className="text-xl mb-3" style={{ color: templateColors.secondary }}>
            {personalInfo.jobTitle}
          </h2>
          
          <div className="flex flex-wrap gap-3 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" style={{ color: templateColors.accent }} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" style={{ color: templateColors.accent }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" style={{ color: templateColors.accent }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" style={{ color: templateColors.accent }} />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" style={{ color: templateColors.accent }} />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Summary */}
        {summary && (
          <div style={styles.section}>
            <h3 style={styles.title}>Professional Summary</h3>
            <p className="text-sm leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.title}>Experience</h3>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="text-sm">
                  <div className="font-semibold" style={{ color: templateColors.secondary }}>
                    {exp.title} at {exp.company}
                  </div>
                  <div className="text-xs mb-1" style={{ color: templateColors.accent }}>
                    {exp.startDate} - {exp.endDate}
                  </div>
                  <p className="text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.title}>Education</h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="text-sm">
                  <div className="font-semibold" style={{ color: templateColors.secondary }}>
                    {edu.degree}
                  </div>
                  <div style={{ color: templateColors.accent }}>
                    {edu.institution}, {edu.location}
                  </div>
                  <div className="text-xs">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.title}>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded text-sm"
                  style={{
                    backgroundColor: templateColors.accent + '20',
                    color: templateColors.primary
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
