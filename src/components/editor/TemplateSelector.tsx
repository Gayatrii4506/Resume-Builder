import React, { useState, useEffect } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { templateConfigs } from "@/config/templateConfig";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Check, Settings, Eye, Layout, Loader2 } from "lucide-react";
import { ResumeTemplate, TemplateColors } from "@/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplateCustomizer from "./TemplateCustomizer";
import { useNavigate } from "react-router-dom";
import ResumePreview from "@/components/preview/ResumePreview";

const TemplateSelector = () => {
  const navigate = useNavigate();
  const { activeTemplate, setActiveTemplate, templateColors, setTemplateColors } = useResume();
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [customColors, setCustomColors] = useState<TemplateColors | null>(null);
  const [previewTemplates, setPreviewTemplates] = useState<string[]>([]);
  const [loadingTemplate, setLoadingTemplate] = useState<string | null>(null);

  const templates = Object.entries(templateConfigs).map(([key, colors]) => ({
    id: key as ResumeTemplate,
    name: key.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    colors
  }));

  // Load activeTemplate preview first
  useEffect(() => {
    if (activeTemplate && !previewTemplates.includes(activeTemplate)) {
      setPreviewTemplates(prev => [...prev, activeTemplate]);
    }
  }, [activeTemplate]);

  const handleTemplateSelect = (templateId: ResumeTemplate) => {
    setActiveTemplate(templateId);
    setTemplateColors(templateConfigs[templateId]);
    setCustomColors(null);
    setShowCustomizer(false);
  };

  const handleColorChange = (colors: TemplateColors) => {
    setCustomColors(colors);
    setTemplateColors(colors);
  };

  const generatePreview = (templateId: string) => {
    if (previewTemplates.includes(templateId)) return;
    
    setLoadingTemplate(templateId);
    
    // Add a short delay for UI feedback
    setTimeout(() => {
      setPreviewTemplates(prev => [...prev, templateId]);
      setLoadingTemplate(null);
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Add Template Library Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Layout className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="font-medium text-blue-800">Browse Template Library</h3>
            <p className="text-sm text-blue-700">
              Explore our collection of modern, ATS-friendly templates
            </p>
          </div>
        </div>
        <Button 
          size="sm"
          onClick={() => navigate("/templates")}
          variant="outline"
          className="border-blue-300 text-blue-700 hover:bg-blue-100"
        >
          <Eye className="h-4 w-4 mr-2" /> View All Templates
        </Button>
      </div>

      <Tabs defaultValue={showCustomizer ? "customize" : "select"}>
        <TabsList>
          <TabsTrigger value="select">Select Template</TabsTrigger>
          <TabsTrigger value="customize">Customize Colors</TabsTrigger>
        </TabsList>
        <TabsContent value="select" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all overflow-hidden ${
                  activeTemplate === template.id 
                    ? "ring-2 ring-primary ring-offset-2" 
                    : "hover:border-primary/50"
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    {template.name}
                    {activeTemplate === template.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="aspect-[8.5/11] rounded-md overflow-hidden border shadow-sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!previewTemplates.includes(template.id)) {
                        generatePreview(template.id);
                      }
                    }}
                  >
                    {loadingTemplate === template.id ? (
                      <div className="h-full w-full flex items-center justify-center bg-gray-50">
                        <Loader2 className="h-5 w-5 text-primary animate-spin" />
                      </div>
                    ) : previewTemplates.includes(template.id) ? (
                      <div className="transform scale-[0.15] origin-top-left absolute w-[700%] h-[700%]">
                        <div className="w-full h-full" style={{ background: `linear-gradient(45deg, ${template.colors.primary}10, ${template.colors.background})` }}>
                          <ResumePreview template={template.id as ResumeTemplate} scale={1} />
                        </div>
                      </div>
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-white to-gray-50 flex items-center justify-center"
                           style={{ background: `linear-gradient(45deg, ${template.colors.primary}10, ${template.colors.background})` }}>
                        <div className="p-2 text-xs text-center text-gray-500">
                          <div className="w-12 h-3 mx-auto mb-1 rounded-sm" style={{ backgroundColor: template.colors.primary + '40' }}></div>
                          <div className="w-20 h-2 mx-auto mb-3 rounded-sm bg-gray-200"></div>
                          <div className="w-full h-1 mb-1 rounded-sm bg-gray-200"></div>
                          <div className="w-full h-1 mb-1 rounded-sm bg-gray-200"></div>
                          <div className="w-3/4 h-1 rounded-sm bg-gray-200"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="customize" className="mt-6">
          <TemplateCustomizer 
            colors={customColors || templateColors}
            onChange={handleColorChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplateSelector; 