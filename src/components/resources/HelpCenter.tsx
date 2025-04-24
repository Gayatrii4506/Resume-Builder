import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, FileQuestion } from "lucide-react";

const HelpCenter = () => {
  const faqs = [
    {
      question: "How do I create a new resume?",
      answer: "Click on the 'Create Resume' button on the dashboard. You'll be taken to the editor where you can start building your resume step by step."
    },
    {
      question: "Can I customize the resume templates?",
      answer: "Yes! You can choose from various color schemes and layouts. Each template is fully customizable to match your preferences."
    },
    {
      question: "How do I export my resume as PDF?",
      answer: "Once you're satisfied with your resume, click the 'Download PDF' button in the preview section. Your resume will be exported with all formatting preserved."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security seriously. Your information is encrypted and stored securely. We never share your data with third parties."
    },
    {
      question: "Can I edit my resume after saving?",
      answer: "Absolutely! You can edit your resume at any time. All your changes are automatically saved, and you can access your resumes from the dashboard."
    },
    {
      question: "How do I use the AI suggestions?",
      answer: "The AI assistant provides real-time suggestions to improve your resume. Simply click on the AI icon in the editor to get personalized recommendations."
    }
  ];

  const supportChannels = [
    {
      title: "Email Support",
      description: "Get help via email",
      icon: <Mail className="w-6 h-6" />,
      action: "Send Email",
      href: "mailto:support@resumebuilder.com"
    },
    {
      title: "Live Chat",
      description: "Chat with our support team",
      icon: <MessageCircle className="w-6 h-6" />,
      action: "Start Chat",
      href: "#"
    },
    {
      title: "Knowledge Base",
      description: "Browse our help articles",
      icon: <FileQuestion className="w-6 h-6" />,
      action: "View Articles",
      href: "#"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      <p className="text-muted-foreground mb-8">
        Find answers to common questions and get support for your resume building needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {supportChannels.map((channel, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-2">
                {channel.icon}
                <CardTitle>{channel.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{channel.description}</p>
              <Button asChild>
                <a href={channel.href}>{channel.action}</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our support team is available Monday through Friday, 9 AM to 5 PM EST.
              We typically respond to inquiries within 24 hours.
            </p>
            <Button asChild>
              <a href="mailto:support@resumebuilder.com">Contact Support</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter; 