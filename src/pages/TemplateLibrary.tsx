import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { templateConfigs } from "@/config/templateConfig";
import { useResume } from "@/contexts/ResumeContext";
import { ResumeTemplate } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowLeft, Download, Sparkles, Info, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import ResumePreview from "@/components/preview/ResumePreview";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const TemplateLibrary = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setActiveTemplate, activeTemplate, resume } = useResume();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplate | null>(null);
  const [loadingTemplate, setLoadingTemplate] = useState<ResumeTemplate | null>(null);
  const [previewImages, setPreviewImages] = useState<Record<string, boolean>>({});
  
  // Initialize preview loading state for all templates
  useEffect(() => {
    const templates = Object.keys(templateConfigs) as ResumeTemplate[];
    const initialPreviewState: Record<string, boolean> = {};
    templates.forEach(template => {
      initialPreviewState[template] = false;
    });
    setPreviewImages(initialPreviewState);
  }, []);
  
  // Group templates by category
  const templateCategories = {
    all: Object.keys(templateConfigs) as ResumeTemplate[],
    modern: ["modern-blue", "modern-green", "modern-orange"] as ResumeTemplate[],
    professional: ["professional-maroon", "executive-black"] as ResumeTemplate[],
    creative: ["creative-purple", "creative-teal"] as ResumeTemplate[],
    minimal: ["minimal-gray"] as ResumeTemplate[],
  };
  
  // Template metadata with more detailed descriptions
  const templateMetadata: Record<ResumeTemplate, { 
    name: string; 
    description: string; 
    atsScore: number; 
    bestFor: string[];
    isPopular: boolean;
  }> = {
    "modern-blue": {
      name: "Modern Blue",
      description: "Clean and professional design with blue accents. Perfect for most industries.",
      atsScore: 95,
      bestFor: ["Software Engineering", "Marketing", "Finance"],
      isPopular: true
    },
    "modern-green": {
      name: "Modern Green",
      description: "Fresh design with green highlights. Great for environmental, healthcare, and education roles.",
      atsScore: 92,
      bestFor: ["Healthcare", "Education", "Environmental Science"],
      isPopular: false
    },
    "professional-maroon": {
      name: "Professional Maroon",
      description: "Classic professional layout with maroon accents. Ideal for traditional industries.",
      atsScore: 98,
      bestFor: ["Finance", "Law", "Consulting", "Banking"],
      isPopular: true
    },
    "creative-purple": {
      name: "Creative Purple",
      description: "Distinctive design with purple highlights. Stands out for creative roles.",
      atsScore: 85,
      bestFor: ["Design", "Marketing", "Creative Direction", "Media"],
      isPopular: false
    },
    "minimal-gray": {
      name: "Minimal Gray",
      description: "Clean, minimalist layout with subtle gray elements. Versatile and elegant.",
      atsScore: 90,
      bestFor: ["Any Industry", "Executive Roles"],
      isPopular: true
    },
    "executive-black": {
      name: "Executive Black",
      description: "Sophisticated black and white design for senior professionals.",
      atsScore: 96,
      bestFor: ["Executive", "Director", "Senior Management"],
      isPopular: false
    },
    "modern-orange": {
      name: "Modern Orange",
      description: "Energetic design with orange highlights. Great for dynamic industries.",
      atsScore: 88,
      bestFor: ["Sales", "Hospitality", "Real Estate"],
      isPopular: false
    },
    "creative-teal": {
      name: "Creative Teal",
      description: "Fresh and modern teal design. Perfect for creative and tech industries.",
      atsScore: 87,
      bestFor: ["Technology", "Startups", "Digital Media"],
      isPopular: true
    }
  };
  
  const handleSelectTemplate = (template: ResumeTemplate) => {
    setActiveTemplate(template);
    toast({
      title: "Template selected",
      description: `${templateMetadata[template].name} has been selected for your resume`,
      duration: 3000,
    });
    navigate("/editor");
  };
  
  const handlePreviewTemplate = (template: ResumeTemplate) => {
    setPreviewTemplate(template);
  };
  
  const handleClosePreview = () => {
    setPreviewTemplate(null);
  };
  
  const getTemplateDisplayName = (templateId: ResumeTemplate) => {
    return templateMetadata[templateId]?.name || 
      templateId.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
  };
  
  const generatePreview = (template: ResumeTemplate) => {
    // Set loading state for this template
    setLoadingTemplate(template);
    
    // Store the original template to restore later
    const originalTemplate = activeTemplate;
    
    // Set the active template to generate the preview
    setActiveTemplate(template);
    
    // After a delay to ensure rendering, update the preview state
    setTimeout(() => {
      setPreviewImages(prev => ({
        ...prev,
        [template]: true
      }));
      
      // Restore the original template after preview is generated
      setActiveTemplate(originalTemplate);
      setLoadingTemplate(null);
    }, 300);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-bold">Template Library</h1>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Choose a Resume Template</h2>
          <p className="text-muted-foreground mb-6">
            Browse our collection of professionally designed resume templates. 
            All templates are ATS-friendly and optimized for job applications.
          </p>
          
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Templates</TabsTrigger>
              <TabsTrigger value="modern">Modern</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="creative">Creative</TabsTrigger>
              <TabsTrigger value="minimal">Minimal</TabsTrigger>
            </TabsList>
            
            {Object.entries(templateCategories).map(([category, templates]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((templateId) => (
                    <Card key={templateId} className="overflow-hidden flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{getTemplateDisplayName(templateId)}</CardTitle>
                            <CardDescription className="mt-1">
                              {templateMetadata[templateId].description.substring(0, 60)}...
                            </CardDescription>
                          </div>
                          {templateMetadata[templateId].isPopular && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              Popular
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="flex-1 p-3 pb-2 bg-gray-50 border-y">
                        <div 
                          className="aspect-[8.5/11] relative overflow-hidden cursor-pointer border border-gray-200 shadow-sm" 
                          onClick={() => {
                            if (!previewImages[templateId]) {
                              generatePreview(templateId);
                            } else {
                              handlePreviewTemplate(templateId);
                            }
                          }}
                        >
                          {loadingTemplate === templateId ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-white">
                              <Loader2 className="h-8 w-8 text-primary animate-spin" />
                              <span className="ml-2 text-sm text-muted-foreground">Generating preview...</span>
                            </div>
                          ) : previewImages[templateId] ? (
                            <div className="transform scale-[0.25] origin-top-left absolute top-0 left-0 w-[400%] h-[400%]">
                              <div className="w-full h-full" style={{ background: `linear-gradient(45deg, ${templateConfigs[templateId].primary}20, ${templateConfigs[templateId].background})` }}>
                                <ResumePreview template={templateId} scale={1} />
                              </div>
                            </div>
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white" style={{ background: `linear-gradient(45deg, ${templateConfigs[templateId].primary}15, ${templateConfigs[templateId].background})` }}>
                              <div className="text-center p-4">
                                <div className="mb-3">
                                  <div className="h-6 w-24 rounded-md bg-gray-200 mx-auto mb-2"></div>
                                  <div className="h-3 w-32 rounded-md bg-gray-100 mx-auto"></div>
                                </div>
                                <div className="h-2 w-full rounded-md bg-gray-100 mb-1"></div>
                                <div className="h-2 w-full rounded-md bg-gray-100 mb-1"></div>
                                <div className="h-2 w-2/3 rounded-md bg-gray-100 mb-3"></div>
                                <div className="h-4 w-1/3 rounded-md" style={{ backgroundColor: templateConfigs[templateId].primary + '30' }}></div>
                                <div className="h-2 w-full rounded-md bg-gray-100 mt-2 mb-1"></div>
                                <div className="h-2 w-full rounded-md bg-gray-100 mb-1"></div>
                              </div>
                              <Button variant="ghost" size="sm" className="mt-4" onClick={() => generatePreview(templateId)}>
                                Generate Preview
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-4 bg-white flex flex-col items-stretch gap-3">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <Sparkles className="h-4 w-4 text-amber-500 mr-1" />
                            <span className="text-sm font-medium">ATS Score: {templateMetadata[templateId].atsScore}%</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handlePreviewTemplate(templateId)}
                          >
                            Preview
                          </Button>
                        </div>
                        
                        <Button 
                          onClick={() => handleSelectTemplate(templateId)}
                          className="w-full"
                          variant={activeTemplate === templateId ? "secondary" : "default"}
                        >
                          {activeTemplate === templateId ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Current Template
                            </>
                          ) : (
                            "Use This Template"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-blue-800 mb-2">About Our Templates</h3>
              <p className="text-blue-800 mb-3">
                All templates in our library are designed to be ATS-friendly, ensuring your resume gets past 
                automated screening systems while maintaining a professional, modern appearance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-md p-4 border border-blue-200">
                  <h4 className="font-medium mb-2 text-blue-800">ATS Optimization</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Clear section headings</li>
                    <li>• Standard fonts and formatting</li>
                    <li>• No complex tables or graphics</li>
                    <li>• Proper hierarchy of information</li>
                  </ul>
                </div>
                <div className="bg-white rounded-md p-4 border border-blue-200">
                  <h4 className="font-medium mb-2 text-blue-800">Design Features</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Professional color schemes</li>
                    <li>• Balanced white space</li>
                    <li>• Consistent styling</li>
                    <li>• Optimized for both print and digital viewing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Template Preview Dialog */}
      <Dialog open={previewTemplate !== null} onOpenChange={(open) => !open && handleClosePreview()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {previewTemplate && getTemplateDisplayName(previewTemplate)} Template
            </DialogTitle>
            <DialogDescription>
              {previewTemplate && templateMetadata[previewTemplate].description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {previewTemplate && (
              <div className="aspect-[8.5/11] w-full relative mx-auto border border-gray-200 shadow-md">
                <div className="transform scale-50 origin-top-left absolute top-0 left-0 w-[200%] h-[200%]">
                  <ResumePreview template={previewTemplate} scale={1} />
                </div>
              </div>
            )}
          </div>
          
          {previewTemplate && (
            <div className="bg-muted p-4 rounded-md my-4">
              <h4 className="font-medium mb-2">Best For</h4>
              <div className="flex flex-wrap gap-2">
                {templateMetadata[previewTemplate].bestFor.map((industry, idx) => (
                  <Badge key={idx} variant="secondary">{industry}</Badge>
                ))}
              </div>
            </div>
          )}
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleClosePreview}>Close</Button>
            {previewTemplate && (
              <Button onClick={() => {
                handleSelectTemplate(previewTemplate);
                handleClosePreview();
              }}>
                Use This Template
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateLibrary; 