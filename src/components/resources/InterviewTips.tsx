import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InterviewTips = () => {
  const preparationTips = [
    "Research the company and role thoroughly",
    "Review your resume and be ready to discuss each point",
    "Prepare questions to ask the interviewer",
    "Practice common interview questions",
    "Plan your route and arrive early",
    "Dress professionally and appropriately",
    "Bring copies of your resume and references"
  ];

  const commonQuestions = [
    {
      question: "Tell me about yourself",
      tip: "Focus on relevant experience and achievements, keep it concise (2-3 minutes)"
    },
    {
      question: "Why do you want to work here?",
      tip: "Show your research and align your goals with company values"
    },
    {
      question: "What are your strengths?",
      tip: "Provide specific examples and relate them to the job requirements"
    },
    {
      question: "What are your weaknesses?",
      tip: "Be honest but show how you're working to improve"
    },
    {
      question: "Where do you see yourself in 5 years?",
      tip: "Show ambition while staying realistic and aligned with company growth"
    }
  ];

  const bodyLanguageTips = [
    "Maintain good eye contact",
    "Sit up straight and lean slightly forward",
    "Use natural hand gestures",
    "Smile and nod appropriately",
    "Avoid crossing arms or legs",
    "Mirror the interviewer's body language",
    "Keep your phone away and silent"
  ];

  const followUpTips = [
    "Send a thank-you email within 24 hours",
    "Reference specific points from the interview",
    "Reiterate your interest in the position",
    "Include any additional information requested",
    "Follow up if you haven't heard back in a week",
    "Keep the tone professional and enthusiastic",
    "Proofread before sending"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Interview Preparation Guide</h1>
      <p className="text-muted-foreground mb-8">
        Master your interview skills with these comprehensive tips and strategies.
      </p>

      <Tabs defaultValue="preparation" className="space-y-6">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="preparation">Preparation</TabsTrigger>
          <TabsTrigger value="questions">Common Questions</TabsTrigger>
          <TabsTrigger value="body-language">Body Language</TabsTrigger>
          <TabsTrigger value="follow-up">Follow Up</TabsTrigger>
        </TabsList>

        <TabsContent value="preparation">
          <Card>
            <CardHeader>
              <CardTitle>Interview Preparation Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                {preparationTips.map((tip, index) => (
                  <li key={index} className="text-muted-foreground">
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Common Interview Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commonQuestions.map((item, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <h3 className="font-semibold mb-2">{item.question}</h3>
                    <p className="text-muted-foreground">{item.tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="body-language">
          <Card>
            <CardHeader>
              <CardTitle>Body Language Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                {bodyLanguageTips.map((tip, index) => (
                  <li key={index} className="text-muted-foreground">
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="follow-up">
          <Card>
            <CardHeader>
              <CardTitle>Follow-Up Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                {followUpTips.map((tip, index) => (
                  <li key={index} className="text-muted-foreground">
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Interview Do's</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Research the company thoroughly</li>
              <li>Prepare thoughtful questions</li>
              <li>Dress appropriately</li>
              <li>Arrive early</li>
              <li>Show enthusiasm</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interview Don'ts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Speak negatively about previous employers</li>
              <li>Check your phone during the interview</li>
              <li>Interrupt the interviewer</li>
              <li>Show up late</li>
              <li>Forget to follow up</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InterviewTips; 