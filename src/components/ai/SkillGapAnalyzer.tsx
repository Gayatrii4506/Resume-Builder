import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useResume } from "@/contexts/ResumeContext";
import { analyzeSkillGap } from "@/services/aiService";
import { Plus, Check, AlertTriangle, RefreshCw, Lightbulb } from "lucide-react";

const SkillGapAnalyzer = () => {
  const { toast } = useToast();
  const { resume, jobDescription, updateResumeContent } = useResume();
  const [analyzing, setAnalyzing] = useState(false);
  const [skillGapResult, setSkillGapResult] = useState<{
    missingSkills: string[];
    matchingSkills: string[];
    recommendedSkills: string[];
    matchPercentage: number;
  } | null>(null);

  const skillsFromResume = resume.content.skills || [];

  const handleAnalyzeSkillGap = async () => {
    if (!jobDescription) {
      toast({
        title: "No job description",
        description: "Please add a job description to analyze skill gaps",
        variant: "destructive"
      });
      return;
    }

    setAnalyzing(true);
    try {
      const result = await analyzeSkillGap(skillsFromResume, jobDescription);
      setSkillGapResult(result);
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Failed to analyze skill gap",
        variant: "destructive"
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const addSkillToResume = (skill: string) => {
    // Check if skill already exists (case insensitive)
    if (skillsFromResume.some(s => s.toLowerCase() === skill.toLowerCase())) {
      toast({
        title: "Skill already exists",
        description: `"${skill}" is already in your skills list`,
        variant: "default"
      });
      return;
    }

    // Add the skill to the resume
    updateResumeContent({
      skills: [...skillsFromResume, skill]
    });

    toast({
      title: "Skill added",
      description: `Added "${skill}" to your skills`,
      duration: 3000,
    });
  };

  // If no job description is available, prompt the user
  if (!jobDescription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Skill Gap Analysis</CardTitle>
          <CardDescription>
            Analyze how your skills match up with a job description
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            Add a job description in the AI Assistant tab to analyze skill gaps
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Skill Gap Analysis</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAnalyzeSkillGap} 
            disabled={analyzing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${analyzing ? 'animate-spin' : ''}`} />
            {analyzing ? "Analyzing..." : "Analyze"}
          </Button>
        </CardTitle>
        <CardDescription>
          Compare your skills with the job requirements to identify gaps
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {skillGapResult ? (
          <>
            {/* Skills Match Percentage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Skills Match</span>
                <span className="font-bold">{skillGapResult.matchPercentage}%</span>
              </div>
              <Progress value={skillGapResult.matchPercentage} className="h-2" />
            </div>

            <Separator className="my-4" />

            {/* Matching Skills */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Matching Skills ({skillGapResult.matchingSkills.length})</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillGapResult.matchingSkills.length > 0 ? (
                  skillGapResult.matchingSkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-green-500/10">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No matching skills found</p>
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <h4 className="font-medium">Missing Skills ({skillGapResult.missingSkills.length})</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillGapResult.missingSkills.length > 0 ? (
                  skillGapResult.missingSkills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-amber-500/10 flex items-center gap-1"
                    >
                      {skill}
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-4 w-4 ml-1 rounded-full p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => addSkillToResume(skill)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No missing skills found. Great job!</p>
                )}
              </div>
            </div>

            {/* Recommended Additional Skills */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Recommended Additional Skills</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillGapResult.recommendedSkills
                  .filter(skill => !skillGapResult.missingSkills.includes(skill))
                  .slice(0, 5)
                  .map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-blue-500/10 flex items-center gap-1"
                    >
                      {skill}
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-4 w-4 ml-1 rounded-full p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => addSkillToResume(skill)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Click the "Analyze" button to compare your skills with the job requirements
            </p>
          </div>
        )}
      </CardContent>

      {skillGapResult && (
        <CardFooter className="bg-muted/50 px-6 py-4 text-sm">
          <p>
            Click the "+" icon next to any skill to add it to your resume. 
            Adding relevant skills can significantly improve your match rate.
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default SkillGapAnalyzer; 