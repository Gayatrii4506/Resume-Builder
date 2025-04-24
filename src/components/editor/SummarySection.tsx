import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useResume } from "@/contexts/ResumeContext";
import { improveResumeSection, generateProfessionalSummary } from "@/services/aiService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Create form schema for summary generator
const formSchema = z.object({
  yearsOfExperience: z.string().optional(),
  targetJobTitle: z.string().optional(),
});

const SummarySection = () => {
  const { toast } = useToast();
  const { resume, updateResumeContent } = useResume();
  const { summary } = resume.content;
  const [isImproving, setIsImproving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yearsOfExperience: "",
      targetJobTitle: resume.content.personalInfo.jobTitle || "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateResumeContent({
      summary: e.target.value
    });
  };
  
  const handleImprove = async () => {
    setIsImproving(true);
    
    try {
      const improvedSummary = await improveResumeSection("summary", summary);
      updateResumeContent({ summary: improvedSummary });
      
      toast({
        title: "Summary improved",
        description: "Your professional summary has been enhanced with AI",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to improve summary",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsImproving(false);
    }
  };

  const handleGenerateSummary = async (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    
    try {
      const yearsOfExperience = values.yearsOfExperience ? parseInt(values.yearsOfExperience) : undefined;
      
      const generatedSummary = await generateProfessionalSummary(
        resume.content.personalInfo,
        resume.content.experience,
        resume.content.education,
        resume.content.skills,
        yearsOfExperience,
        values.targetJobTitle
      );
      
      updateResumeContent({ summary: generatedSummary });
      
      toast({
        title: "Summary generated",
        description: "Your professional summary has been automatically generated",
        duration: 3000,
      });
      
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate summary",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="resume-section">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">Professional Summary</h3>
        <div className="flex space-x-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary">
                <Wand2 className="h-4 w-4 mr-2" />
                Auto-Generate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Generate Professional Summary</DialogTitle>
                <DialogDescription>
                  Our AI will generate a customized professional summary based on your resume information.
                  Provide additional details to make it more targeted.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleGenerateSummary)} className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="yearsOfExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g., 5" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          How many years of professional experience do you have?
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="targetJobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Job Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Senior Software Engineer" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          What position are you targeting with this resume?
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      disabled={isGenerating}
                    >
                      {isGenerating ? "Generating..." : "Generate Summary"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleImprove}
            disabled={isImproving}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isImproving ? "Improving..." : "Improve with AI"}
          </Button>
        </div>
      </div>
      
      <Textarea
        value={summary}
        onChange={handleChange}
        placeholder="Write a professional summary that highlights your key qualifications and career goals..."
        className="min-h-[120px]"
      />
      
      <p className="text-sm text-muted-foreground mt-2">
        A strong summary highlights your key skills and experience in 3-5 sentences. This is often the first section recruiters read.
      </p>
    </div>
  );
};

export default SummarySection;
