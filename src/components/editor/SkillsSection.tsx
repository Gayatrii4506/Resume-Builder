
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, X, Plus } from "lucide-react";
import { useResume } from "@/contexts/ResumeContext";
import { useToast } from "@/components/ui/use-toast";

const SkillsSection = () => {
  const { toast } = useToast();
  const { resume, updateResumeContent } = useResume();
  const { skills } = resume.content;
  
  const [newSkill, setNewSkill] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    if (skills.includes(newSkill.trim())) {
      toast({
        title: "Skill already exists",
        description: "This skill is already in your list",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    updateResumeContent({
      skills: [...skills, newSkill.trim()]
    });
    
    setNewSkill("");
  };
  
  const handleRemoveSkill = (skill: string) => {
    updateResumeContent({
      skills: skills.filter(s => s !== skill)
    });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };
  
  const generateAiSkills = async () => {
    setIsGenerating(true);
    
    // Mock AI skill suggestions - in a real app, this would call an AI service
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const aiSuggestedSkills = [
      "Problem Solving",
      "Team Leadership",
      "Agile Methodology",
      "Communication",
      "Project Management",
      "CI/CD",
      "Test-Driven Development",
      "RESTful APIs"
    ];
    
    // Filter out skills that are already in the list
    const newSkills = aiSuggestedSkills.filter(skill => !skills.includes(skill));
    
    if (newSkills.length > 0) {
      updateResumeContent({
        skills: [...skills, ...newSkills]
      });
      
      toast({
        title: "Skills added",
        description: `${newSkills.length} new skills have been added to your resume`,
        duration: 3000,
      });
    } else {
      toast({
        title: "No new skills",
        description: "All suggested skills are already in your list",
        duration: 3000,
      });
    }
    
    setIsGenerating(false);
  };
  
  return (
    <div className="resume-section">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Skills</h3>
        <Button
          variant="outline"
          onClick={generateAiSkills}
          disabled={isGenerating}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {isGenerating ? "Generating..." : "Suggest Skills"}
        </Button>
      </div>
      
      <div className="flex gap-2 mb-4">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill (e.g., JavaScript, Project Management)"
          className="flex-1"
        />
        <Button onClick={handleAddSkill} disabled={!newSkill.trim()}>
          <Plus className="h-4 w-4 mr-2" /> Add
        </Button>
      </div>
      
      <div>
        {skills.length === 0 ? (
          <p className="text-sm text-muted-foreground italic mb-4">
            No skills added yet. Add skills that are relevant to your target roles.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="py-1.5 px-3">
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        
        <p className="text-sm text-muted-foreground">
          Tips: Include a mix of technical skills, soft skills, and industry-specific knowledge. Order them by relevance to your target role.
        </p>
      </div>
    </div>
  );
};

export default SkillsSection;
