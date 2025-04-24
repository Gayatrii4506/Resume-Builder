import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, FilePlus, Search, Settings, CreditCard, Users, PlusCircle, Clock, Trash2, Copy, Plus, Layout, Eye } from "lucide-react";
import { useResume } from "@/contexts/ResumeContext";
import { format } from "date-fns";
import { Resume } from "@/types";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const { resume, savedResumes, createNewResume, loadResume, setResume } = useResume();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredResumes = savedResumes.filter(resume => 
    resume.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCreateNew = () => {
    createNewResume();
    navigate("/editor");
  };
  
  const handleOpenResume = (id: string) => {
    loadResume(id);
    navigate("/editor");
  };

  const handleDuplicateResume = (id: string) => {
    const resumeToDuplicate = savedResumes.find(r => r.id === id);
    if (resumeToDuplicate) {
      const duplicatedResume = {
        ...resumeToDuplicate,
        id: `${resumeToDuplicate.id}-copy-${Date.now()}`,
        name: `${resumeToDuplicate.name} (Copy)`,
        lastUpdated: new Date(),
      };
      // Add to savedResumes and set as active
      setResume(duplicatedResume);
      // Navigate to editor with the new duplicated resume
      navigate("/editor");
    }
  };
  
  const handleDeleteResume = (id: string) => {
    // Implement delete logic here (e.g., update savedResumes state)
    console.log(`Deleting resume ${id}`);
  };
  
  const renderResumeCard = (resume: Resume) => (
    <Card key={resume.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 border border-gray-200 rounded-lg overflow-hidden">
      <CardHeader className="p-4 bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-800 truncate">
          {resume.name}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 flex items-center gap-1">
          <Clock className="h-3 w-3" /> 
          Last updated: {format(new Date(resume.lastUpdated), "MMM d, yyyy p")}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="text-sm text-gray-600">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-primary" />
            <span>{resume.content.personalInfo.jobTitle || "No job title"}</span>
          </div>
          {/* Add a small preview or summary if desired */}
          <p className="text-xs text-gray-400 line-clamp-2">
            {resume.content.summary || "No summary available."}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <Button 
          size="sm"
          variant="default"
          onClick={() => handleOpenResume(resume.id)}
          className="flex-1 mr-2"
        >
          Open
        </Button>
        <div className="flex gap-1">
          <Button 
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleDuplicateResume(resume.id)}
            title="Duplicate Resume"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button 
            variant="destructive"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleDeleteResume(resume.id)}
            title="Delete Resume"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Resumes</h1>
          <Button onClick={handleCreateNew}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Resume
          </Button>
        </div>
        
        <Tabs defaultValue="resumes">
          <TabsList className="mb-6">
            <TabsTrigger value="resumes">My Resumes</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resumes">
            {filteredResumes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredResumes.map(renderResumeCard)}
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg bg-white">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No resumes found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new resume.</p>
                <div className="mt-6">
                  <Button onClick={handleCreateNew}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Resume
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="templates">
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <Layout className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium text-blue-800 mb-2">Template Library</h3>
                  <p className="text-blue-700 mb-4">
                    Browse our extensive collection of modern, ATS-friendly resume templates designed for various industries and career levels.
                  </p>
                  <Button onClick={() => navigate("/templates")} className="bg-blue-600 hover:bg-blue-700">
                    <Layout className="h-4 w-4 mr-2" /> Explore Template Library
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Modern</CardTitle>
                  <CardDescription>Clean, contemporary design with a focus on readability</CardDescription>
                </CardHeader>
                <CardContent className="h-56 bg-gray-100 flex items-center justify-center">
                  <div className="w-full max-w-[200px] h-[240px] bg-white shadow-md rounded-md mx-auto flex flex-col p-3">
                    <div className="w-3/4 h-4 bg-primary/20 rounded mb-2"></div>
                    <div className="w-1/2 h-3 bg-gray-200 rounded mb-3"></div>
                    <div className="w-full h-2 bg-primary/40 rounded mb-4"></div>
                    <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                    <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                    <div className="w-2/3 h-2 bg-gray-200 rounded mb-3"></div>
                    <div className="w-1/2 h-3 bg-primary/20 rounded mb-2"></div>
                    <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                    <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={handleCreateNew}>Use Template</Button>
                  <Button variant="ghost" size="icon" onClick={() => navigate("/templates")}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Professional</CardTitle>
                  <CardDescription>Traditional layout perfect for corporate positions</CardDescription>
                </CardHeader>
                <CardContent className="h-56 bg-gray-100 flex items-center justify-center">
                  <div className="w-full max-w-[200px] h-[240px] bg-white shadow-md rounded-md mx-auto flex flex-col p-3">
                    <div className="w-full h-6 bg-primary/30 rounded-t mb-2"></div>
                    <div className="w-1/2 h-3 bg-gray-300 rounded mx-auto mb-3"></div>
                    <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                    <div className="w-full h-2 bg-gray-200 rounded mb-3"></div>
                    <div className="w-1/3 h-3 bg-primary/20 rounded mb-2"></div>
                    <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                    <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                    <div className="w-1/3 h-3 bg-primary/20 rounded mb-2"></div>
                    <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={handleCreateNew}>Use Template</Button>
                  <Button variant="ghost" size="icon" onClick={() => navigate("/templates")}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Creative</CardTitle>
                  <CardDescription>Bold design for creative industry positions</CardDescription>
                </CardHeader>
                <CardContent className="h-56 bg-gray-100 flex items-center justify-center">
                  <div className="w-full max-w-[200px] h-[240px] bg-white shadow-md rounded-md mx-auto flex flex-row p-3">
                    <div className="w-1/3 bg-primary/20 rounded-l"></div>
                    <div className="w-2/3 flex flex-col pl-2">
                      <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="w-2/3 h-2 bg-gray-200 rounded mb-3"></div>
                      <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                      <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                      <div className="w-3/4 h-2 bg-gray-200 rounded mb-3"></div>
                      <div className="w-1/2 h-3 bg-primary/20 rounded mb-2"></div>
                      <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                      <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={handleCreateNew}>Use Template</Button>
                  <Button variant="ghost" size="icon" onClick={() => navigate("/templates")}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="account">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account settings and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Settings className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-semibold">Profile Settings</h4>
                            <p className="text-sm text-muted-foreground">Update your personal information</p>
                          </div>
                        </div>
                        <Button variant="ghost">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-semibold">Account Security</h4>
                            <p className="text-sm text-muted-foreground">Manage your password and security settings</p>
                          </div>
                        </div>
                        <Button variant="ghost">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-semibold">Subscription</h4>
                            <p className="text-sm text-muted-foreground">Manage your subscription plan</p>
                          </div>
                        </div>
                        <Button variant="ghost">Upgrade</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
