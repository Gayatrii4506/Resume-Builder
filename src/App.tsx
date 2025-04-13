
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResumeProvider } from "./contexts/ResumeContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import Preview from "./pages/Preview";
import NotFound from "./pages/NotFound";
// import jsPDF from "jspdf"; // Will be used in exportService
// import { v4 as uuidv4 } from "uuid"; // Will be used where needed

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ResumeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ResumeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
