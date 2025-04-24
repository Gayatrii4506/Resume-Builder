import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, Layout, Sparkles, MessageSquare, Download } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const features = [
    {
      icon: <Layout className="h-8 w-8 text-primary" />,
      title: "Modern Templates",
      description: "Choose from a variety of professional, ATS-friendly templates."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "AI-Powered Suggestions",
      description: "Get intelligent recommendations to improve your resume content."
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Easy Content Editing",
      description: "Effortlessly add, edit, and arrange your resume sections."
    },
    {
      icon: <Download className="h-8 w-8 text-primary" />,
      title: "PDF Export",
      description: "Download a pixel-perfect PDF version of your resume anytime."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-blue-50">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-gradient-to-br from-blue-100 via-white to-blue-100">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight animate-fade-in-up">
              Build Your Dream Resume Effortlessly
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-600 max-w-3xl mx-auto">
              Create stunning, professional resumes in minutes with our AI-powered builder. Choose templates, get smart suggestions, and land your next job faster.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform transform hover:scale-105"
                asChild
              >
                <Link to="/dashboard">Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white border-primary text-primary hover:bg-blue-50 shadow-sm transition-transform transform hover:scale-105"
                asChild
              >
                 <Link to="/resources/resume-guide">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose AI Resume Builder?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-100 rounded-xl overflow-hidden">
                  <CardHeader className="bg-blue-50 p-6">
                    <div className="mx-auto bg-blue-100 rounded-full p-3 w-fit mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Career?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
              Start building your professional resume today and take the next step towards your dream job.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-lg transition-transform transform hover:scale-105"
              asChild
            >
              <Link to="/dashboard">Create Your Resume Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
