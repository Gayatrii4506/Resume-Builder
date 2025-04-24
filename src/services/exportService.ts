import { jsPDF } from "jspdf";
import { Resume, ResumeTemplate } from "@/types";
import html2canvas from "html2canvas";

export const exportToPdf = async (resume: Resume, templateName: ResumeTemplate) => {
  try {
    // Get the resume preview element
    const resumeElement = document.querySelector(".resume-preview");
    if (!resumeElement) {
      throw new Error("Resume preview element not found");
    }

    // Clone the element and apply necessary styles for proper rendering
    const clone = resumeElement.cloneNode(true) as HTMLElement;
    document.body.appendChild(clone);
    
    // Apply styles to prevent text overlapping
    clone.style.width = '816px'; // 8.5 inches * 96 DPI
    clone.style.height = 'auto';
    clone.style.position = 'absolute';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    clone.style.transform = 'none';
    
    // Fix underline spacing issues
    const underlinedSections = clone.querySelectorAll('h1, h2, h3, .section-title');
    underlinedSections.forEach((el: Element) => {
      const element = el as HTMLElement;
      element.style.paddingBottom = '10px'; // Add more space below the text
      element.style.marginBottom = '10px'; // Add more margin below
    });
    
    // Fix any bordering elements that might be too close to underlines
    const sectionsAfterUnderlines = clone.querySelectorAll('.section-content, p, .item-info');
    sectionsAfterUnderlines.forEach((el: Element) => {
      const element = el as HTMLElement;
      element.style.paddingTop = '8px'; // Add padding at the top
    });

    // Create canvas with higher quality settings
    const canvas = await html2canvas(clone, {
      scale: 3, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      allowTaint: true,
      removeContainer: true, // Clean up afterwards
    });
    
    // Remove the clone from DOM after capture
    document.body.removeChild(clone);

    // A4 dimensions in mm
    const a4Width = 210;
    const a4Height = 297;

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
      hotfixes: ["px_scaling"]
    });

    // Calculate image dimensions to fit A4 width while maintaining aspect ratio
    const imgWidth = a4Width;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let pdfHeight = imgHeight;
    let pdfPosition = 0;

    // Handle content potentially longer than one page
    if (pdfHeight > a4Height) {
      pdfHeight = a4Height;
      console.warn("Resume content exceeds one page. PDF export might be truncated.");
    }
    
    // Add the image to the PDF
    const imgData = canvas.toDataURL("image/jpeg", 1.0); // Use maximum JPEG quality
    pdf.addImage(imgData, "JPEG", 0, pdfPosition, imgWidth, pdfHeight);

    // Save with proper filename
    const filename = `${resume.name.replace(/\s+/g, '_')}_${templateName}.pdf`;
    pdf.save(filename);

    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error; 
  }
};
