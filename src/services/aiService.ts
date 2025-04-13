
import { AiSuggestion, ResumeContent, JobDescription } from "../types";
import { v4 as uuidv4 } from "uuid";

// This is a mock AI service that would normally call an external API
export const generateSuggestions = async (
  resumeContent: ResumeContent,
  jobDescription?: JobDescription | null
): Promise<AiSuggestion[]> => {
  // In a real application, this would call an AI service
  console.log("Generating suggestions based on resume content and job description");
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const suggestions: AiSuggestion[] = [];

  // Generate some mock suggestions
  if (resumeContent.summary.length < 100) {
    suggestions.push({
      id: uuidv4(),
      text: "Your summary is quite short. Consider expanding it to highlight your key achievements and career goals.",
      type: "improvement",
      section: "summary"
    });
  }

  // If job description is provided, provide tailored suggestions
  if (jobDescription) {
    const jobKeywords = jobDescription.keywords || [];
    
    // Check if skills match job keywords
    const missingSkills = jobKeywords.filter(
      keyword => !resumeContent.skills.some(skill => 
        skill.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    
    if (missingSkills.length > 0) {
      suggestions.push({
        id: uuidv4(),
        text: `Consider adding these skills that match the job description: ${missingSkills.join(", ")}`,
        type: "addition",
        section: "skills"
      });
    }
    
    // Suggest tailoring experience descriptions
    suggestions.push({
      id: uuidv4(),
      text: "Try highlighting your experience with leadership and project management in your most recent role to better match this job description.",
      type: "improvement",
      section: "experience",
      itemId: resumeContent.experience[0]?.id
    });
  }
  
  // Check experience highlights
  if (resumeContent.experience.some(exp => exp.highlights.length < 3)) {
    suggestions.push({
      id: uuidv4(),
      text: "Add more bullet points to your work experience. Aim for at least 3-4 achievements per role.",
      type: "improvement",
      section: "experience"
    });
  }
  
  // Check if there are enough skills
  if (resumeContent.skills.length < 5) {
    suggestions.push({
      id: uuidv4(),
      text: "Your skills section seems limited. Consider adding more technical and soft skills relevant to your target role.",
      type: "addition",
      section: "skills"
    });
  }
  
  return suggestions;
};

export const analyzeJobDescription = async (
  description: string
): Promise<JobDescription> => {
  // In a real application, this would call an AI service to extract keywords
  console.log("Analyzing job description");
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock extracted keywords based on common tech job requirements
  const extractedKeywords = [
    "JavaScript",
    "React",
    "TypeScript",
    "communication skills",
    "problem-solving",
    "team collaboration",
    "agile methodology",
    "code review",
    "REST API"
  ];
  
  // Return mock job description with extracted keywords
  return {
    id: uuidv4(),
    title: "Software Developer",
    company: "Tech Company",
    description: description,
    keywords: extractedKeywords,
    matchScore: 75 // Mock match score
  };
};

export const improveResumeSection = async (
  section: string,
  content: string
): Promise<string> => {
  // Simulate a call to an AI service to improve the given section
  console.log(`Improving ${section} section`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demo purposes, just add some content
  if (section === "summary") {
    return content + " Demonstrated success in delivering high-quality software solutions while collaborating with cross-functional teams to meet business objectives.";
  }
  
  return content;
};
