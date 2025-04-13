
import { jsPDF } from "jspdf";
import { Resume, ResumeTemplate } from "../types";

export const exportToPdf = (resume: Resume, template: ResumeTemplate): void => {
  const doc = new jsPDF();
  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Set font styles
  doc.setFont("helvetica");
  
  // Header with personal info
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(resume.content.personalInfo.fullName, margin, margin);
  
  // Job title
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(resume.content.personalInfo.jobTitle, margin, margin + 7);
  
  // Contact info in a single line
  const contactInfo = `${resume.content.personalInfo.email} | ${resume.content.personalInfo.phone} | ${resume.content.personalInfo.location}`;
  doc.setFontSize(10);
  doc.text(contactInfo, margin, margin + 13);
  
  // Add LinkedIn and website if available
  let webPresence = "";
  if (resume.content.personalInfo.linkedin) {
    webPresence += resume.content.personalInfo.linkedin;
  }
  if (resume.content.personalInfo.website) {
    webPresence += webPresence ? ` | ${resume.content.personalInfo.website}` : resume.content.personalInfo.website;
  }
  if (webPresence) {
    doc.text(webPresence, margin, margin + 18);
  }
  
  // Divider line
  doc.setLineWidth(0.5);
  doc.line(margin, margin + 22, pageWidth - margin, margin + 22);
  
  // Summary
  let currentY = margin + 30;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Summary", margin, currentY);
  currentY += 6;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  // Split long text into multiple lines
  const splitSummary = doc.splitTextToSize(resume.content.summary, pageWidth - (margin * 2));
  doc.text(splitSummary, margin, currentY);
  currentY += splitSummary.length * 5 + 5;
  
  // Experience
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Experience", margin, currentY);
  currentY += 6;
  
  resume.content.experience.forEach(exp => {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`${exp.title} - ${exp.company}, ${exp.location}`, margin, currentY);
    currentY += 5;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text(`${exp.startDate} - ${exp.endDate}`, margin, currentY);
    currentY += 5;
    
    doc.setFont("helvetica", "normal");
    const splitDesc = doc.splitTextToSize(exp.description, pageWidth - (margin * 2));
    doc.text(splitDesc, margin, currentY);
    currentY += splitDesc.length * 5 + 2;
    
    // Bullet points for highlights
    exp.highlights.forEach(highlight => {
      const bulletPoint = "• ";
      const splitHighlight = doc.splitTextToSize(highlight, pageWidth - (margin * 2) - 5);
      doc.text(bulletPoint, margin, currentY);
      doc.text(splitHighlight, margin + 5, currentY);
      currentY += splitHighlight.length * 5 + 2;
    });
    
    currentY += 3;
  });
  
  // Education
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Education", margin, currentY);
  currentY += 6;
  
  resume.content.education.forEach(edu => {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`${edu.degree}`, margin, currentY);
    currentY += 5;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${edu.institution}, ${edu.location}`, margin, currentY);
    currentY += 5;
    
    doc.setFont("helvetica", "italic");
    doc.text(`${edu.startDate} - ${edu.endDate}`, margin, currentY);
    currentY += 5;
    
    if (edu.gpa) {
      doc.setFont("helvetica", "normal");
      doc.text(`GPA: ${edu.gpa}`, margin, currentY);
      currentY += 5;
    }
    
    if (edu.description) {
      doc.setFont("helvetica", "normal");
      const splitDesc = doc.splitTextToSize(edu.description, pageWidth - (margin * 2));
      doc.text(splitDesc, margin, currentY);
      currentY += splitDesc.length * 5;
    }
    
    currentY += 3;
  });
  
  // Skills
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Skills", margin, currentY);
  currentY += 6;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const skillsText = resume.content.skills.join(", ");
  const splitSkills = doc.splitTextToSize(skillsText, pageWidth - (margin * 2));
  doc.text(splitSkills, margin, currentY);
  
  // Save the PDF
  doc.save(`${resume.name.replace(/\s+/g, "_")}.pdf`);
};

