
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useResume } from "@/contexts/ResumeContext";
import { AlertCircle, Check, AlertTriangle } from "lucide-react";

const JobDescriptionAnalyzer = () => {
  const { resume, jobDescription } = useResume();
  
  if (!jobDescription) {
    return null;
  }
  
  // Calculate match percentage (this would be AI-powered in a real app)
  const matchScore = jobDescription.matchScore || 0;
  
  // Extract keywords from job description
  const { keywords } = jobDescription;
  
  // Check which keywords are found in the resume
  const keywordMatches = keywords.map(keyword => {
    const lowerKeyword = keyword.toLowerCase();
    
    // Check if the keyword appears in the resume
    const isInSkills = resume.content.skills.some(skill => 
      skill.toLowerCase().includes(lowerKeyword)
    );
    
    const isInSummary = resume.content.summary.toLowerCase().includes(lowerKeyword);
    
    const isInExperience = resume.content.experience.some(exp => 
      exp.description.toLowerCase().includes(lowerKeyword) ||
      exp.highlights.some(highlight => highlight.toLowerCase().includes(lowerKeyword))
    );
    
    return {
      keyword,
      found: isInSkills || isInSummary || isInExperience
    };
  });
  
  const foundKeywords = keywordMatches.filter(k => k.found);
  const missingKeywords = keywordMatches.filter(k => !k.found);
  
  // Determine match level
  let matchLevel = "Low";
  let matchColor = "text-red-500";
  
  if (matchScore >= 80) {
    matchLevel = "High";
    matchColor = "text-green-500";
  } else if (matchScore >= 60) {
    matchLevel = "Medium";
    matchColor = "text-amber-500";
  }
  
  return (
    <div className="mt-4 space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Job Match Analysis</h4>
        <div className="flex justify-between items-center mb-2">
          <span>Resume-Job Match Score</span>
          <span className={`font-bold ${matchColor}`}>{matchLevel} ({matchScore}%)</span>
        </div>
        <Progress value={matchScore} className="h-2" />
      </div>
      
      <div>
        <h4 className="font-semibold mb-3">Keyword Analysis</h4>
        <div className="bg-muted rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Keywords Found</span>
            <span className="text-sm font-medium">{foundKeywords.length} of {keywords.length}</span>
          </div>
          <Progress 
            value={(foundKeywords.length / keywords.length) * 100} 
            className="h-2 mb-4" 
          />
          
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-1 mb-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Keywords Found</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {foundKeywords.length > 0 ? (
                  foundKeywords.map((item, index) => (
                    <Badge key={index} variant="outline" className="bg-green-500/10">
                      {item.keyword}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No matching keywords found</span>
                )}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-1 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Missing Keywords</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.length > 0 ? (
                  missingKeywords.map((item, index) => (
                    <Badge key={index} variant="outline" className="bg-amber-500/10">
                      {item.keyword}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">All keywords found!</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-500/10 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-medium mb-1">AI Recommendations</h5>
              <ul className="text-sm space-y-2">
                {missingKeywords.length > 0 && (
                  <li>Consider adding missing keywords to your resume, especially in your skills section and work experience.</li>
                )}
                <li>Tailor your professional summary to highlight experience relevant to this position.</li>
                <li>Quantify achievements in your experience section that relate to the job requirements.</li>
                <li>Ensure your most recent and relevant experience prominently features matching keywords.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionAnalyzer;
