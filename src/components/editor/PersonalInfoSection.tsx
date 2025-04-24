import React, { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResume } from "@/contexts/ResumeContext";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";

const PersonalInfoSection = () => {
  const { resume, updateResumeContent } = useResume();
  const { personalInfo } = resume.content;
  
  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateResumeContent({
      personalInfo: {
        ...personalInfo,
        [field]: e.target.value,
      },
    });
  };

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateResumeContent({
          personalInfo: {
            ...personalInfo,
            photoUrl: reader.result as string,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  }, [personalInfo, updateResumeContent]);

  const removePhoto = useCallback(() => {
    updateResumeContent({
      personalInfo: {
        ...personalInfo,
        photoUrl: undefined,
      },
    });
  }, [personalInfo, updateResumeContent]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Photo Upload */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                {personalInfo.photoUrl ? (
                  <img
                    src={personalInfo.photoUrl}
                    alt={personalInfo.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <ImagePlus className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </Avatar>
              {personalInfo.photoUrl && (
                <button
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div>
              <Label htmlFor="photo-upload" className="block mb-2">
                Profile Photo
              </Label>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="max-w-xs"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Recommended: Square image, 400x400px or larger
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={personalInfo.fullName}
                onChange={handleChange("fullName")}
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={personalInfo.jobTitle}
                onChange={handleChange("jobTitle")}
                placeholder="Software Engineer"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={handleChange("email")}
                placeholder="john@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={personalInfo.phone}
                onChange={handleChange("phone")}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={personalInfo.location}
                onChange={handleChange("location")}
                placeholder="New York, NY"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={personalInfo.linkedin}
                onChange={handleChange("linkedin")}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={personalInfo.website || ""}
                onChange={handleChange("website")}
                placeholder="johndoe.com"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
