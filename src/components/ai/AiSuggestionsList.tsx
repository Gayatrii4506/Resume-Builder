
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X, MessageSquare, Lightbulb, Sparkles, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useResume } from "@/contexts/ResumeContext";
import { AiSuggestion } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const AiSuggestionsList = () => {
  const { toast } = useToast();
  const { suggestions, setSuggestions, resume, updateResumeContent } = useResume();
  
  const handleApplySuggestion = (suggestion: AiSuggestion) => {
    // This would normally implement the suggestion in the resume
    // For this demo, we'll just show a toast
    toast({
      title: "Suggestion applied",
      description: "The AI suggestion has been applied to your resume",
      duration: 3000,
    });
    
    // Remove the suggestion from the list
    setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
  };
  
  const handleDismissSuggestion = (suggestionId: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    
    toast({
      title: "Suggestion dismissed",
      description: "The suggestion has been removed from your list",
      duration: 3000,
    });
  };
  
  const getSuggestionIcon = (type: AiSuggestion["type"]) => {
    switch (type) {
      case "improvement":
        return <Sparkles className="h-5 w-5 text-amber-500" />;
      case "addition":
        return <Lightbulb className="h-5 w-5 text-green-500" />;
      case "removal":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "rewrite":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      default:
        return <Sparkles className="h-5 w-5 text-primary" />;
    }
  };
  
  if (suggestions.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No suggestions available. Generate some to improve your resume!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => (
        <Card key={suggestion.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex gap-3">
            <div className="shrink-0 mt-1">
              {getSuggestionIcon(suggestion.type)}
            </div>
            <div className="flex-1">
              <div className="mb-2">
                <p>{suggestion.text}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Section: <span className="font-medium">{suggestion.section}</span>
                  {suggestion.itemId && <span> (ID: {suggestion.itemId.slice(0, 6)}...)</span>}
                </p>
              </div>
              <div className="flex gap-2 justify-end">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => handleDismissSuggestion(suggestion.id)}
                >
                  <X className="h-4 w-4 mr-1" /> Dismiss
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleApplySuggestion(suggestion)}
                >
                  <Check className="h-4 w-4 mr-1" /> Apply
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AiSuggestionsList;
