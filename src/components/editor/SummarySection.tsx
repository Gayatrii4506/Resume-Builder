
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useResume } from "@/contexts/ResumeContext";
import { improveResumeSection } from "@/services/aiService";

const SummarySection = () => {
  const { toast } = useToast();
  const { resume, updateResumeContent } = useResume();
  const { summary } = resume.content;
  const [isImproving, setIsImproving] = React.useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateResumeContent({
      summary: e.target.value
    });
  };
  
  const handleImprove = async () => {
    setIsImproving(true);
    
    try {
      const improvedSummary = await improveResumeSection("summary", summary);
      updateResumeContent({ summary: improvedSummary });
      
      toast({
        title: "Summary improved",
        description: "Your professional summary has been enhanced with AI",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to improve summary",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsImproving(false);
    }
  };
  
  return (
    <div className="resume-section">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">Professional Summary</h3>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleImprove}
          disabled={isImproving}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {isImproving ? "Improving..." : "Improve with AI"}
        </Button>
      </div>
      
      <Textarea
        value={summary}
        onChange={handleChange}
        placeholder="Write a professional summary that highlights your key qualifications and career goals..."
        className="min-h-[120px]"
      />
      
      <p className="text-sm text-muted-foreground mt-2">
        A strong summary highlights your key skills and experience in 3-5 sentences. This is often the first section recruiters read.
      </p>
    </div>
  );
};

export default SummarySection;
