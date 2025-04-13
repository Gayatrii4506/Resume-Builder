
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, GripVertical, Sparkles } from "lucide-react";
import { useResume } from "@/contexts/ResumeContext";
import { ExperienceItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { improveResumeSection } from "@/services/aiService";

const ExperienceSection = () => {
  const { toast } = useToast();
  const { resume, updateResumeContent } = useResume();
  const { experience } = resume.content;
  
  const [isImproving, setIsImproving] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  
  const handleAddExperience = () => {
    const newExperience: ExperienceItem = {
      id: uuidv4(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "Present",
      description: "",
      highlights: []
    };
    
    updateResumeContent({
      experience: [...experience, newExperience]
    });
    
    // Expand the newly added item
    setExpandedItems(prev => [...prev, newExperience.id]);
  };
  
  const handleRemoveExperience = (id: string) => {
    updateResumeContent({
      experience: experience.filter(exp => exp.id !== id)
    });
    
    // Remove from expanded items if present
    setExpandedItems(prev => prev.filter(item => item !== id));
  };
  
  const handleExperienceChange = (id: string, field: keyof ExperienceItem, value: string) => {
    updateResumeContent({
      experience: experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };
  
  const handleAddHighlight = (experienceId: string) => {
    updateResumeContent({
      experience: experience.map(exp =>
        exp.id === experienceId
          ? { ...exp, highlights: [...exp.highlights, ""] }
          : exp
      )
    });
  };
  
  const handleHighlightChange = (experienceId: string, index: number, value: string) => {
    updateResumeContent({
      experience: experience.map(exp =>
        exp.id === experienceId
          ? {
              ...exp,
              highlights: exp.highlights.map((highlight, i) =>
                i === index ? value : highlight
              )
            }
          : exp
      )
    });
  };
  
  const handleRemoveHighlight = (experienceId: string, index: number) => {
    updateResumeContent({
      experience: experience.map(exp =>
        exp.id === experienceId
          ? {
              ...exp,
              highlights: exp.highlights.filter((_, i) => i !== index)
            }
          : exp
      )
    });
  };
  
  const handleImproveDescription = async (id: string) => {
    const experienceItem = experience.find(exp => exp.id === id);
    if (!experienceItem) return;
    
    setIsImproving(id);
    
    try {
      const improvedDescription = await improveResumeSection(
        "experience", 
        experienceItem.description
      );
      
      handleExperienceChange(id, "description", improvedDescription);
      
      toast({
        title: "Description improved",
        description: "Your experience description has been enhanced with AI",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to improve description",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsImproving(null);
    }
  };
  
  return (
    <div className="resume-section">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Work Experience</h3>
        <Button onClick={handleAddExperience}>
          <Plus className="h-4 w-4 mr-2" /> Add Experience
        </Button>
      </div>
      
      {experience.length === 0 ? (
        <div className="text-center py-8 border border-dashed rounded-md">
          <p className="text-muted-foreground">No work experience added yet.</p>
          <Button className="mt-4" onClick={handleAddExperience}>
            <Plus className="h-4 w-4 mr-2" /> Add Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp) => (
            <Card key={exp.id} className="overflow-hidden">
              <div 
                className="p-4 bg-muted flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(exp.id)}
              >
                <div className="flex items-center gap-2">
                  <div className="drag-handle">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {exp.title || "New Position"} {exp.company && `at ${exp.company}`}
                    </h4>
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-sm text-muted-foreground">
                        {exp.startDate || "Start date"} - {exp.endDate || "End date"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{exp.highlights.length} points</Badge>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveExperience(exp.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
              
              {expandedItems.includes(exp.id) && (
                <CardContent className="p-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`${exp.id}-title`}>Job Title</Label>
                      <Input
                        id={`${exp.id}-title`}
                        value={exp.title}
                        onChange={(e) => handleExperienceChange(exp.id, "title", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`${exp.id}-company`}>Company</Label>
                      <Input
                        id={`${exp.id}-company`}
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`${exp.id}-location`}>Location</Label>
                      <Input
                        id={`${exp.id}-location`}
                        value={exp.location}
                        onChange={(e) => handleExperienceChange(exp.id, "location", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor={`${exp.id}-start-date`}>Start Date</Label>
                        <Input
                          id={`${exp.id}-start-date`}
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`${exp.id}-end-date`}>End Date</Label>
                        <Input
                          id={`${exp.id}-end-date`}
                          type="month"
                          value={exp.endDate === "Present" ? "" : exp.endDate}
                          onChange={(e) => handleExperienceChange(
                            exp.id, 
                            "endDate", 
                            e.target.value || "Present"
                          )}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <Label htmlFor={`${exp.id}-description`}>Description</Label>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleImproveDescription(exp.id)}
                        disabled={isImproving === exp.id || !exp.description}
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        {isImproving === exp.id ? "Improving..." : "Improve"}
                      </Button>
                    </div>
                    <Textarea
                      id={`${exp.id}-description`}
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                      placeholder="Describe your responsibilities and the company..."
                      className="mt-1"
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label>Key Achievements/Responsibilities</Label>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleAddHighlight(exp.id)}
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add Point
                      </Button>
                    </div>
                    
                    {exp.highlights.length === 0 ? (
                      <p className="text-sm text-muted-foreground italic mb-4">
                        No achievements added yet. Add bullet points to highlight your key responsibilities and accomplishments.
                      </p>
                    ) : (
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-2">•</span>
                            <Input
                              value={highlight}
                              onChange={(e) => handleHighlightChange(exp.id, index, e.target.value)}
                              placeholder="Describe an achievement or responsibility..."
                              className="flex-1"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleRemoveHighlight(exp.id, index)}
                              className="mt-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <p className="text-sm text-muted-foreground">
                      Tips: Use action verbs and quantify your achievements with numbers when possible.
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;
