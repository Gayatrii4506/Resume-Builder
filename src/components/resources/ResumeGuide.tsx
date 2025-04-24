import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ResumeGuide = () => {
  const sections = [
    {
      title: "Resume Formatting Best Practices",
      content: [
        "Use a clean, professional font (Arial, Calibri, or Times New Roman)",
        "Keep font size between 10-12 points",
        "Use consistent spacing and alignment",
        "Include clear section headings",
        "Limit resume to 1-2 pages",
        "Use bullet points for better readability",
        "Save as PDF to preserve formatting"
      ]
    },
    {
      title: "Essential Resume Sections",
      content: [
        "Contact Information: Name, email, phone, location",
        "Professional Summary: Brief overview of your career",
        "Work Experience: Chronological order with achievements",
        "Education: Degrees, institutions, dates",
        "Skills: Technical and soft skills",
        "Certifications: Relevant professional certifications",
        "Projects: Significant projects and achievements"
      ]
    },
    {
      title: "Writing Effective Bullet Points",
      content: [
        "Start with strong action verbs",
        "Quantify achievements with numbers",
        "Focus on results and impact",
        "Use industry-specific keywords",
        "Keep points concise and clear",
        "Highlight transferable skills",
        "Tailor points to job requirements"
      ]
    },
    {
      title: "ATS Optimization Tips",
      content: [
        "Use standard section headings",
        "Include relevant keywords from job description",
        "Avoid tables and complex formatting",
        "Use simple bullet points",
        "Save in ATS-friendly format (PDF)",
        "Avoid images and graphics",
        "Use standard fonts"
      ]
    },
    {
      title: "Common Resume Mistakes to Avoid",
      content: [
        "Spelling and grammatical errors",
        "Inconsistent formatting",
        "Including irrelevant information",
        "Using unprofessional email addresses",
        "Listing outdated skills",
        "Including personal information",
        "Using generic descriptions"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Resume Writing Guide</h1>
      <p className="text-muted-foreground mb-8">
        Learn how to create a professional resume that stands out to employers and passes ATS screening.
      </p>

      <Accordion type="single" collapsible className="space-y-4">
        {sections.map((section, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pro Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Customize your resume for each job application</li>
              <li>Keep your resume updated regularly</li>
              <li>Use metrics to quantify your achievements</li>
              <li>Focus on relevant experience and skills</li>
              <li>Proofread multiple times</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Industry-specific resume examples</li>
              <li>Action verb list for bullet points</li>
              <li>ATS keyword optimization guide</li>
              <li>Resume formatting templates</li>
              <li>Professional summary examples</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeGuide; 