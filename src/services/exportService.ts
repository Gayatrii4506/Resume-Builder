
import { jsPDF } from "jspdf";
import { Resume, ResumeTemplate } from "@/types";

export const exportToPdf = (resume: Resume, templateName: ResumeTemplate) => {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Add content to the PDF based on resume data
  doc.setFontSize(16);
  doc.text(`${resume.content.personalInfo.fullName} - Resume`, 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Template: ${templateName}`, 20, 30);
  
  doc.setFontSize(10);
  // Personal Info
  doc.text("Personal Information", 20, 40);
  doc.text(`Name: ${resume.content.personalInfo.fullName}`, 20, 45);
  doc.text(`Job Title: ${resume.content.personalInfo.jobTitle}`, 20, 50);
  doc.text(`Email: ${resume.content.personalInfo.email}`, 20, 55);
  doc.text(`Phone: ${resume.content.personalInfo.phone}`, 20, 60);
  doc.text(`Location: ${resume.content.personalInfo.location}`, 20, 65);
  
  // Summary
  if (resume.content.summary) {
    doc.text("Summary", 20, 75);
    doc.text(resume.content.summary, 20, 80);
  }
  
  // Experience
  if (resume.content.experience.length > 0) {
    let yPos = 95;
    doc.text("Experience", 20, yPos);
    yPos += 5;
    
    resume.content.experience.forEach(exp => {
      doc.text(`${exp.title} at ${exp.company}`, 20, yPos);
      yPos += 5;
      doc.text(`${exp.startDate} - ${exp.endDate}`, 20, yPos);
      yPos += 5;
      doc.text(exp.description, 20, yPos, { maxWidth: 170 });
      yPos += 15;
    });
  }
  
  // Save the PDF and trigger download
  doc.save(`${resume.name.replace(/\s+/g, '_')}.pdf`);
};
