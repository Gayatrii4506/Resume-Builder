
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { useResume } from "@/contexts/ResumeContext";
import { EducationItem } from "@/types";
import { Badge } from "@/components/ui/badge";

const EducationSection = () => {
  const { resume, updateResumeContent } = useResume();
  const { education } = resume.content;
  
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  
  const handleAddEducation = () => {
    const newEducation: EducationItem = {
      id: uuidv4(),
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "Present",
      description: "",
      gpa: ""
    };
    
    updateResumeContent({
      education: [...education, newEducation]
    });
    
    // Expand the newly added item
    setExpandedItems(prev => [...prev, newEducation.id]);
  };
  
  const handleRemoveEducation = (id: string) => {
    updateResumeContent({
      education: education.filter(edu => edu.id !== id)
    });
    
    // Remove from expanded items if present
    setExpandedItems(prev => prev.filter(item => item !== id));
  };
  
  const handleEducationChange = (id: string, field: keyof EducationItem, value: string) => {
    updateResumeContent({
      education: education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };
  
  return (
    <div className="resume-section">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Education</h3>
        <Button onClick={handleAddEducation}>
          <Plus className="h-4 w-4 mr-2" /> Add Education
        </Button>
      </div>
      
      {education.length === 0 ? (
        <div className="text-center py-8 border border-dashed rounded-md">
          <p className="text-muted-foreground">No education added yet.</p>
          <Button className="mt-4" onClick={handleAddEducation}>
            <Plus className="h-4 w-4 mr-2" /> Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu) => (
            <Card key={edu.id} className="overflow-hidden">
              <div 
                className="p-4 bg-muted flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(edu.id)}
              >
                <div className="flex items-center gap-2">
                  <div className="drag-handle">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {edu.degree || "New Degree"} {edu.institution && `at ${edu.institution}`}
                    </h4>
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-sm text-muted-foreground">
                        {edu.startDate || "Start date"} - {edu.endDate || "End date"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{edu.gpa ? `GPA: ${edu.gpa}` : "No GPA"}</Badge>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveEducation(edu.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
              
              {expandedItems.includes(edu.id) && (
                <CardContent className="p-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`${edu.id}-degree`}>Degree</Label>
                      <Input
                        id={`${edu.id}-degree`}
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                        placeholder="e.g., Bachelor of Science in Computer Science"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`${edu.id}-institution`}>Institution</Label>
                      <Input
                        id={`${edu.id}-institution`}
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                        placeholder="e.g., University of Technology"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`${edu.id}-location`}>Location</Label>
                      <Input
                        id={`${edu.id}-location`}
                        value={edu.location}
                        onChange={(e) => handleEducationChange(edu.id, "location", e.target.value)}
                        placeholder="e.g., Boston, MA"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`${edu.id}-gpa`}>GPA (optional)</Label>
                      <Input
                        id={`${edu.id}-gpa`}
                        value={edu.gpa || ""}
                        onChange={(e) => handleEducationChange(edu.id, "gpa", e.target.value)}
                        placeholder="e.g., 3.8"
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor={`${edu.id}-start-date`}>Start Date</Label>
                        <Input
                          id={`${edu.id}-start-date`}
                          type="month"
                          value={edu.startDate}
                          onChange={(e) => handleEducationChange(edu.id, "startDate", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`${edu.id}-end-date`}>End Date</Label>
                        <Input
                          id={`${edu.id}-end-date`}
                          type="month"
                          value={edu.endDate === "Present" ? "" : edu.endDate}
                          onChange={(e) => handleEducationChange(
                            edu.id, 
                            "endDate", 
                            e.target.value || "Present"
                          )}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`${edu.id}-description`}>Description (optional)</Label>
                    <Textarea
                      id={`${edu.id}-description`}
                      value={edu.description || ""}
                      onChange={(e) => handleEducationChange(edu.id, "description", e.target.value)}
                      placeholder="Add relevant coursework, honors, achievements, etc."
                      className="mt-1"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Tips: Include relevant coursework, academic achievements, extracurricular activities, or thesis topics.
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

export default EducationSection;
