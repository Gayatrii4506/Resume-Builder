import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, PencilIcon, ArrowLeft } from "lucide-react";
import { useResume } from "@/contexts/ResumeContext";
import { exportToPdf } from "@/services/exportService";
import ResumePreview from "@/components/preview/ResumePreview";
import Header from "@/components/layout/Header";
import { useToast } from "@/components/ui/use-toast";

const Preview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { resume, activeTemplate } = useResume();
  
  const handleExport = async () => {
    try {
      await exportToPdf(resume, activeTemplate);
      toast({
        title: "Resume exported",
        description: "Your resume has been exported as a PDF",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast({
        title: "Export failed",
        description: "Failed to export your resume as PDF",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => navigate("/editor")}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> 
            Back to Editor
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/editor")}
            >
              <PencilIcon className="h-4 w-4 mr-2" /> Edit Resume
            </Button>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </Button>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-8 text-center">Resume Preview</h1>
        
        <div className="flex justify-center">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-[800px] w-full">
            <ResumePreview scale={1} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Preview;
