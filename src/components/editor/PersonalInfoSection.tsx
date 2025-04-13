
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResume } from "@/contexts/ResumeContext";

const PersonalInfoSection = () => {
  const { resume, updateResumeContent } = useResume();
  const { personalInfo } = resume.content;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateResumeContent({
      personalInfo: {
        ...personalInfo,
        [name]: value
      }
    });
  };
  
  return (
    <div className="resume-section">
      <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={personalInfo.jobTitle}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={personalInfo.email}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={personalInfo.location}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="linkedin">LinkedIn (optional)</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={personalInfo.linkedin || ""}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="website">Website (optional)</Label>
          <Input
            id="website"
            name="website"
            value={personalInfo.website || ""}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
