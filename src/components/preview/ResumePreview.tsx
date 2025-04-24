import React, { useEffect, useState } from "react";
import { useResume } from "@/contexts/ResumeContext";
import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import { ResumeTemplate } from "@/types";

interface ResumePreviewProps {
  scale?: number;
  template?: ResumeTemplate;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ scale = 1, template }) => {
  const { resume, activeTemplate } = useResume();
  const [temporaryTemplate, setTemporaryTemplate] = useState<ResumeTemplate | null>(null);

  // Use template prop if provided, otherwise use activeTemplate from context
  const templateToRender = template || activeTemplate;

  const renderTemplate = () => {
    // For demo purposes, let's simplify and use ModernTemplate for all types
    // In a real application, you would have different template components
    switch (templateToRender) {
      case "modern-blue":
      case "modern-green":
      case "modern-orange":
        return <ModernTemplate resume={resume} />;
      case "professional-maroon":
      case "executive-black":
        return <ProfessionalTemplate resume={resume} />;
      case "creative-purple":
      case "creative-teal":
        return <CreativeTemplate resume={resume} />;
      case "minimal-gray":
        return <ModernTemplate resume={resume} />; // Could be a MinimalTemplate in real app
      default:
        return <ModernTemplate resume={resume} />;
    }
  };
  
  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}>
      <div className="resume-preview w-[8.5in] min-h-[11in] bg-white mx-auto p-8 shadow-md">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
