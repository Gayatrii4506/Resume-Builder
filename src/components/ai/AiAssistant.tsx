
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Send, User } from "lucide-react";
import { useResume } from "@/contexts/ResumeContext";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

const AiAssistant = () => {
  const { resume } = useResume();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      text: "Hello! I'm your AI resume assistant. How can I help you with your resume today?",
      sender: "assistant",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsProcessing(true);
    
    // Simulate AI response delay (would call AI service in a real app)
    setTimeout(() => {
      const aiResponse = generateAiResponse(inputMessage);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        text: aiResponse,
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Mock AI response generator
  const generateAiResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes("summary") || lowerCaseMessage.includes("profile")) {
      return "For your professional summary, focus on highlighting your most relevant skills and experiences. Keep it concise (3-5 sentences) and tailor it to the specific job you're applying for. Use strong action verbs and quantify achievements when possible.";
    }
    
    if (lowerCaseMessage.includes("experience") || lowerCaseMessage.includes("work")) {
      return "When describing your work experience, use the STAR method (Situation, Task, Action, Result) to structure your bullet points. Quantify your achievements whenever possible (e.g., 'Increased sales by 25%' instead of 'Increased sales'). Focus on results and impact rather than just listing responsibilities.";
    }
    
    if (lowerCaseMessage.includes("skill")) {
      return "For your skills section, include a mix of hard skills (technical abilities) and soft skills (interpersonal qualities). Prioritize skills mentioned in the job description you're targeting. Consider organizing them by category if you have many skills to list.";
    }
    
    if (lowerCaseMessage.includes("education")) {
      return "In your education section, include your degree, institution, graduation date, and location. If you're a recent graduate, you can also add relevant coursework, GPA (if above 3.5), academic achievements, and extracurricular activities that demonstrate transferable skills.";
    }
    
    if (lowerCaseMessage.includes("ats") || lowerCaseMessage.includes("applicant tracking")) {
      return "To make your resume ATS-friendly, use standard section headings, include keywords from the job description, avoid using tables or complex formatting, and stick to common fonts. Keep the design clean and simple to ensure your resume can be properly parsed by the system.";
    }
    
    if (lowerCaseMessage.includes("length") || lowerCaseMessage.includes("page")) {
      return "For most professionals, a one-page resume is ideal. If you have more than 10 years of relevant experience, two pages may be appropriate. Focus on your most recent and relevant experiences, and be concise in your descriptions.";
    }
    
    // Default response for other queries
    return "I'd be happy to help with your resume. Could you provide more specific details about what aspect of your resume you'd like assistance with? I can help with formatting, content suggestions, or tailoring your resume to specific job descriptions.";
  };
  
  return (
    <div className="flex flex-col h-[500px] border rounded-lg overflow-hidden bg-card">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`flex gap-3 max-w-[80%] ${
                  message.sender === "user" 
                    ? "flex-row-reverse" 
                    : "flex-row"
                }`}
              >
                <Avatar>
                  {message.sender === "user" ? (
                    <User className="h-6 w-6 text-muted-foreground" />
                  ) : (
                    <div className="bg-gradient-to-r from-primary to-secondary p-1.5 rounded text-white w-full h-full flex items-center justify-center">
                      AI
                    </div>
                  )}
                </Avatar>
                <div 
                  className={`p-3 rounded-lg ${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}
                >
                  <p>{message.text}</p>
                  <p 
                    className={`text-xs mt-1 ${
                      message.sender === "user" 
                        ? "text-primary-foreground/70" 
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        {isProcessing && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <div className="animate-pulse">AI is thinking...</div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="shrink-0"
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about your resume..."
            className="flex-1 min-h-0 h-10 py-2"
          />
          <Button 
            className="shrink-0"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isProcessing}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="mt-2 text-xs text-muted-foreground">
          <p>Ask for suggestions on improving specific sections, ATS optimization, or formatting advice.</p>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
