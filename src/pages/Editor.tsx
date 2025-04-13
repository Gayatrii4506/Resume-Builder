
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Save, Eye, Download, LayoutDashboard, FileText, Wand, FileQuestion,
  MessageSquare, BarChart, Check, Trash2, Sparkles
} from "lucide-react";
import { useResume } from "@/contexts/ResumeContext";
import { exportToPdf } from "@/services/exportService";
import { generateSuggestions, analyzeJobDescription } from "@/services/aiService";
import Header from "@/components/layout/Header";
import PersonalInfoSection from "@/components/editor/PersonalInfoSection";
import SummarySection from "@/components/editor/SummarySection";
import ExperienceSection from "@/components/editor/ExperienceSection";
import EducationSection from "@/components/editor/EducationSection";
import SkillsSection from "@/components/editor/SkillsSection";
import AiAssistant from "@/components/ai/AiAssistant";
import AiSuggestionsList from "@/components/ai/AiSuggestionsList";
import JobDescriptionAnalyzer from "@/components/ai/JobDescriptionAnalyzer";
import ResumePreview from "@/components/preview/ResumePreview";

const Editor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    resume, 
    setResume, 
    saveCurrentResume, 
    activeTemplate, 
    suggestions, 
    setSuggestions,
    jobDescription,
    setJobDescription
  } = useResume();
  
  const [jobDescText, setJobDescText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  
  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    saveCurrentResume();
    setIsSaving(false);
    
    toast({
      title: "Resume saved",
      description: "Your resume has been saved successfully",
      duration: 3000,
    });
  };
  
  const handlePreview = () => {
    navigate("/preview");
  };
  
  const handleExport = () => {
    exportToPdf(resume, activeTemplate);
    
    toast({
      title: "Resume exported",
      description: "Your resume has been exported as a PDF",
      duration: 3000,
    });
  };
  
  const handleGenerateSuggestions = async () => {
    setIsGeneratingSuggestions(true);
    try {
      const newSuggestions = await generateSuggestions(resume.content, jobDescription);
      setSuggestions(newSuggestions);
      
      toast({
        title: "AI suggestions generated",
        description: `${newSuggestions.length} suggestions have been generated for your resume`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error generating suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI suggestions",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };
  
  const handleAnalyzeJobDescription = async () => {
    if (!jobDescText.trim()) {
      toast({
        title: "Empty job description",
        description: "Please paste a job description to analyze",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsAnalyzing(true);
    try {
      const analyzed = await analyzeJobDescription(jobDescText);
      setJobDescription(analyzed);
      
      toast({
        title: "Job description analyzed",
        description: "Keywords extracted and resume match score calculated",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error analyzing job description:", error);
      toast({
        title: "Error",
        description: "Failed to analyze job description",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const clearJobDescription = () => {
    setJobDescText("");
    setJobDescription(null);
  };
  
  // Generate initial suggestions when component mounts
  useEffect(() => {
    const loadInitialSuggestions = async () => {
      if (suggestions.length === 0) {
        setIsGeneratingSuggestions(true);
        try {
          const initialSuggestions = await generateSuggestions(resume.content);
          setSuggestions(initialSuggestions);
        } catch (error) {
          console.error("Error generating initial suggestions:", error);
        } finally {
          setIsGeneratingSuggestions(false);
        }
      }
    };
    
    loadInitialSuggestions();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">{resume.name}</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
            </Button>
            <Button 
              variant="outline" 
              onClick={handlePreview}
            >
              <Eye className="h-4 w-4 mr-2" /> Preview
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" /> Save
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left panel - Editor sections */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="mb-6 grid grid-cols-4 w-full">
                <TabsTrigger value="content">
                  <FileText className="h-4 w-4 mr-2" /> Content
                </TabsTrigger>
                <TabsTrigger value="ai-assistant">
                  <Wand className="h-4 w-4 mr-2" /> AI Assistant
                </TabsTrigger>
                <TabsTrigger value="job-match">
                  <FileQuestion className="h-4 w-4 mr-2" /> Job Match
                </TabsTrigger>
                <TabsTrigger value="analytics">
                  <BarChart className="h-4 w-4 mr-2" /> Analytics
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-6">
                <PersonalInfoSection />
                <SummarySection />
                <ExperienceSection />
                <EducationSection />
                <SkillsSection />
              </TabsContent>
              
              <TabsContent value="ai-assistant">
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="mb-4 flex justify-between items-center">
                        <h3 className="text-xl font-semibold flex items-center">
                          <Sparkles className="h-5 w-5 mr-2 text-primary" /> AI Suggestions
                        </h3>
                        <Button 
                          size="sm" 
                          onClick={handleGenerateSuggestions}
                          disabled={isGeneratingSuggestions}
                        >
                          {isGeneratingSuggestions ? "Generating..." : "Refresh Suggestions"}
                        </Button>
                      </div>
                      <AiSuggestionsList />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-primary" /> AI Chat Assistant
                      </h3>
                      <AiAssistant />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="job-match">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Job Description Analyzer</h3>
                    <div className="mb-4">
                      <p className="text-muted-foreground mb-2">
                        Paste a job description below to analyze and optimize your resume for this specific role.
                      </p>
                      <Textarea
                        value={jobDescText}
                        onChange={(e) => setJobDescText(e.target.value)}
                        placeholder="Paste job description here..."
                        className="min-h-[200px] mb-4"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={handleAnalyzeJobDescription}
                          disabled={isAnalyzing || !jobDescText.trim()}
                        >
                          {isAnalyzing ? "Analyzing..." : "Analyze Job Description"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={clearJobDescription}
                          disabled={!jobDescText && !jobDescription}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Clear
                        </Button>
                      </div>
                    </div>
                    
                    {jobDescription && <JobDescriptionAnalyzer />}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Resume Analytics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Resume Score</h4>
                        <div className="text-3xl font-bold">85/100</div>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">ATS Compatibility</h4>
                        <div className="text-3xl font-bold text-green-500">High</div>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Keywords</h4>
                        <div className="text-3xl font-bold">24</div>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold mb-2">Improvement Areas</h4>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Strong summary section with key qualifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Good use of action verbs in experience descriptions</span>
                      </li>
                      <li className="flex items-start gap-2 text-amber-500">
                        <span className="h-5 w-5 flex items-center justify-center shrink-0 mt-0.5">!</span>
                        <span>Consider adding more quantifiable achievements</span>
                      </li>
                      <li className="flex items-start gap-2 text-amber-500">
                        <span className="h-5 w-5 flex items-center justify-center shrink-0 mt-0.5">!</span>
                        <span>Skills section could be expanded with more technical skills</span>
                      </li>
                    </ul>
                    
                    <p className="text-sm text-muted-foreground">
                      These analytics are based on industry standards and best practices for resume optimization.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right panel - Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Live Preview</h3>
              <div className="border rounded-lg overflow-hidden mb-4">
                <ResumePreview scale={0.6} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handlePreview}>
                  <Eye className="h-4 w-4 mr-2" /> Full Preview
                </Button>
                <Button onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" /> Export PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editor;
