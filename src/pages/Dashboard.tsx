
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, FilePlus, Search, Settings, CreditCard, Users, PlusCircle } from "lucide-react";
import { useResume } from "@/contexts/ResumeContext";
import { format } from "date-fns";
import { Resume } from "@/types";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const { resume, savedResumes, createNewResume, loadResume } = useResume();
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
  
  const renderResumeCard = (resume: Resume) => (
    <Card key={resume.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle>{resume.name}</CardTitle>
        <CardDescription>
          Last updated: {format(new Date(resume.lastUpdated), "MMM d, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        <div className="text-sm text-muted-foreground">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-4 w-4" />
            <span>{resume.content.personalInfo.jobTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(resume.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          variant="default" 
          className="w-full"
          onClick={() => handleOpenResume(resume.id)}
        >
          Open
        </Button>
      </CardFooter>
    </Card>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Resume Dashboard</h1>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search resumes..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleCreateNew}>
              <PlusCircle className="h-4 w-4 mr-2" /> Create New Resume
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="resumes">
          <TabsList className="mb-6">
            <TabsTrigger value="resumes">My Resumes</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resumes">
            {filteredResumes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredResumes.map(renderResumeCard)}
                <Card className="border-dashed border-2 hover:border-primary/50 transition-colors flex flex-col items-center justify-center p-6 cursor-pointer"
                      onClick={handleCreateNew}>
                  <FilePlus className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground font-medium">Create New Resume</p>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12">
                <FilePlus className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Resumes Found</h3>
                <p className="text-muted-foreground mb-6">Get started by creating your first resume</p>
                <Button onClick={handleCreateNew}>
                  <PlusCircle className="h-4 w-4 mr-2" /> Create New Resume
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="templates">
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
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={handleCreateNew}>Use Template</Button>
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
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={handleCreateNew}>Use Template</Button>
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
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={handleCreateNew}>Use Template</Button>
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
