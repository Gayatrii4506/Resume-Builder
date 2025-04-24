import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { 
  Save, Eye, Download, LayoutDashboard, FileText, Wand, FileQuestion,
  MessageSquare, BarChart, Check, Trash2, Sparkles, Palette, Pencil, Lightbulb
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
import TemplateSelector from "@/components/editor/TemplateSelector";
import SkillGapAnalyzer from "@/components/ai/SkillGapAnalyzer";

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
  
  // State for renaming
  const [isRenaming, setIsRenaming] = useState(false);
  const [editedName, setEditedName] = useState(resume.name);
  const renameInputRef = useRef<HTMLInputElement>(null);

  // Update editedName if resume changes externally (e.g., loading a different resume)
  useEffect(() => {
    setEditedName(resume.name);
  }, [resume.name]);

  // Focus input when renaming starts
  useEffect(() => {
    if (isRenaming) {
      renameInputRef.current?.focus();
      renameInputRef.current?.select(); // Select text for easy replacement
    }
  }, [isRenaming]);

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

  // --- Rename Handlers ---
  const handleRenameStart = () => {
    setEditedName(resume.name); // Reset edit field to current name
    setIsRenaming(true);
  };

  const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleRenameSubmit = () => {
    let nameChanged = false;
    if (editedName.trim() === "") {
      toast({ title: "Error", description: "Resume name cannot be empty", variant: "destructive" });
      setEditedName(resume.name); // Reset to original name
    } else if (editedName.trim() !== resume.name) {
        setResume(prev => ({ ...prev, name: editedName.trim() }));
        toast({ title: "Renamed", description: `Resume renamed to "${editedName.trim()}"` });
        nameChanged = true;
    }
    setIsRenaming(false);
    return nameChanged; // Indicate if the name was actually changed
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRenameSubmit();
    } else if (e.key === "Escape") {
      setEditedName(resume.name); // Reset on escape
      setIsRenaming(false);
    }
  };
  // --- End Rename Handlers ---

  // --- Save Handler (Updated) ---
  const handleSave = async () => {
    let nameWasUpdated = false;
    // Ensure the latest name from edit state is set before saving
    if (isRenaming) {
       nameWasUpdated = handleRenameSubmit(); // Commit rename if user clicks save while input is active
       // If rename failed (e.g., empty name), don't proceed with save
       if (!nameWasUpdated && editedName.trim() === "") return; 
    }
    setIsSaving(true);
    // saveCurrentResume uses the state from ResumeContext, which handleRenameSubmit updated
    await new Promise(resolve => setTimeout(resolve, 800)); 
    saveCurrentResume(); 
    setIsSaving(false);
    // Avoid showing double toast if rename happened
    if (!nameWasUpdated) { 
      toast({
        title: "Resume saved",
        description: "Your resume has been saved successfully",
        duration: 3000,
      });
    }
  };
  // --- End Save Handler ---

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* -- Interactive Resume Title -- */} 
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {isRenaming ? (
              <Input
                ref={renameInputRef}
                value={editedName}
                onChange={handleRenameChange}
                onKeyDown={handleRenameKeyDown}
                onBlur={handleRenameSubmit} // Save when input loses focus
                className="text-2xl md:text-3xl font-bold h-10 flex-1"
              />
            ) : (
              <div className="flex items-center gap-2 cursor-pointer group" onClick={handleRenameStart}>
                 <h1 className="text-2xl md:text-3xl font-bold text-gray-800 truncate">
                  {resume.name}
                 </h1>
                 <Pencil className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
              </div>
            )}
          </div>
           {/* -- End Interactive Resume Title -- */}

          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm"
              variant="outline" 
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
            </Button>
            <Button 
              size="sm"
              variant="outline" 
              onClick={handlePreview}
            >
              <Eye className="h-4 w-4 mr-2" /> Full Preview
            </Button>
            <Button 
              size="sm"
              variant="outline" 
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" /> Export PDF
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" /> Save Resume
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left panel - Editor sections */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="content" data-value="content" className="flex-1">Content</TabsTrigger>
                <TabsTrigger value="template" data-value="template" className="flex-1">Template</TabsTrigger>
                <TabsTrigger value="ai" data-value="ai" className="flex-1">AI Assistant</TabsTrigger>
                <TabsTrigger value="job-match" data-value="job-match" className="flex-1">Job Match</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-6">
                <PersonalInfoSection />
                <SummarySection />
                <ExperienceSection />
                <EducationSection />
                <SkillsSection />
              </TabsContent>
              
              <TabsContent value="template" className="mt-4">
                <div className="space-y-6">
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <h3 className="text-lg font-medium mb-2">Templates & Styling</h3>
                    <p className="text-muted-foreground">
                      Choose from our library of ATS-friendly templates or customize colors to match your personal brand.
                    </p>
                  </div>
                  <TemplateSelector />
                </div>
              </TabsContent>
              
              <TabsContent value="ai" className="space-y-6 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" /> AI Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      size="sm" 
                      onClick={handleGenerateSuggestions}
                      disabled={isGeneratingSuggestions} 
                      className="mb-4"
                    >
                      {isGeneratingSuggestions ? "Generating..." : "Refresh Suggestions"}
                    </Button>
                    <AiSuggestionsList />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                       <MessageSquare className="h-5 w-5 text-primary" /> AI Chat Assistant
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AiAssistant />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="job-match" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description Analyzer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground">
                        Paste a job description below to analyze and optimize your resume for this specific role.
                      </p>
                    <Textarea
                      value={jobDescText}
                      onChange={(e) => setJobDescText(e.target.value)}
                      placeholder="Paste job description here..."
                      className="min-h-[150px]"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleAnalyzeJobDescription}
                        disabled={isAnalyzing || !jobDescText.trim()}
                      >
                        {isAnalyzing ? "Analyzing..." : "Analyze"}
                      </Button>
                    </div>
                    {jobDescription && <JobDescriptionAnalyzer />} 
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right panel - Preview */}
          <div className="lg:col-span-1 sticky top-24">
            <Card className="shadow-md border border-gray-200 overflow-hidden">
               <CardHeader className="bg-gray-50 border-b p-4">
                 <CardTitle className="text-lg">Live Preview</CardTitle>
               </CardHeader>
               <CardContent className="p-4 bg-gray-200">
                 <div className="aspect-[8.5/11] w-full overflow-hidden border border-gray-300 shadow-inner">
                  <ResumePreview scale={0.65} /> 
                 </div>
               </CardContent>
                <CardFooter className="bg-gray-50 border-t p-3 flex justify-end gap-2">
                   <Button size="sm" variant="outline" onClick={handlePreview}>
                    <Eye className="h-4 w-4 mr-2" /> Full Preview
                  </Button>
                  <Button size="sm" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" /> Export PDF
                  </Button>
                </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editor;
