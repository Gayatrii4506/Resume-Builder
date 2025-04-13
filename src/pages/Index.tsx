
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Layout, Sparkles, MessageSquare, Download } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Create Your Perfect Resume With AI
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Build professional resumes with intelligent suggestions tailored to your career goals
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90"
                  asChild
                >
                  <Link to="/dashboard">Create Resume <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  View Templates
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful AI Features</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Suggestions</h3>
                <p className="text-muted-foreground">
                  Get intelligent content recommendations tailored specifically to your target job roles
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <Layout className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Job Description Analyzer</h3>
                <p className="text-muted-foreground">
                  Optimize your resume to match specific job descriptions and maximize your chances
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Drag-and-Drop Editor</h3>
                <p className="text-muted-foreground">
                  Easily organize and customize your resume with our intuitive drag-and-drop interface
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Chat Assistant</h3>
                <p className="text-muted-foreground">
                  Get interactive guidance and answers to your resume-building questions
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Professional Templates</h3>
                <p className="text-muted-foreground">
                  Choose from multiple professionally-designed templates optimized for applicant tracking systems
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
                <Button className="bg-primary hover:bg-primary/90" asChild>
                  <Link to="/dashboard">
                    Try It Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Users Say</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "This AI resume builder helped me tailor my resume to exactly what employers were looking for. I got more interviews in one month than I did in the previous six!"
                </p>
                <p className="font-semibold">- Sarah K., Marketing Manager</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The AI suggestions were spot-on for my field. It helped me highlight accomplishments I wouldn't have thought to include. Within two weeks, I had three interview requests!"
                </p>
                <p className="font-semibold">- Michael T., Software Engineer</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "As someone switching careers, I had no idea how to present my transferable skills. This tool analyzed my experience and highlighted relevant skills I didn't realize I had!"
                </p>
                <p className="font-semibold">- Jennifer L., Career Changer</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Create Your Perfect Resume?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start building your AI-powered resume today and increase your chances of landing your dream job.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link to="/dashboard">Get Started for Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
