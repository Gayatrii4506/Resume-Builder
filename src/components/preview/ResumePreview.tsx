
import React from "react";
import { useResume } from "@/contexts/ResumeContext";
import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";

interface ResumePreviewProps {
  scale?: number;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ scale = 1 }) => {
  const { resume, activeTemplate } = useResume();
  
  const renderTemplate = () => {
    switch (activeTemplate) {
      case "modern":
        return <ModernTemplate resume={resume} />;
      case "professional":
        return <ProfessionalTemplate resume={resume} />;
      case "creative":
        return <CreativeTemplate resume={resume} />;
      default:
        return <ModernTemplate resume={resume} />;
    }
  };
  
  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}>
      <div className="w-[8.5in] min-h-[11in] bg-white mx-auto p-8 shadow-md">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
