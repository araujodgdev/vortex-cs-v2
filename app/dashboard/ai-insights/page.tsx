"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AIInsightsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground">
            AI-powered recommendations and insights for customer success
          </p>
        </div>
        <Button>
          <Brain className="h-4 w-4 mr-2" />
          Generate New Insights
        </Button>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
          <TabsTrigger value="risks">Risk Detection</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Success Recommendations</CardTitle>
              <CardDescription>
                AI-generated recommendations to improve customer success metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RecommendationCard 
                title="Onboarding Process Improvement"
                description="Analysis of recent onboarding sessions suggests that customers struggle with the API integration step. Consider creating additional documentation or video tutorials."
                impact="High"
                category="Onboarding"
                effort="Medium"
              />
              
              <RecommendationCard 
                title="Feature Adoption Campaign"
                description="12 enterprise customers haven't utilized the new reporting features. A targeted email campaign with use cases could increase adoption by an estimated 35%."
                impact="Medium"
                category="Feature Adoption"
                effort="Low"
              />
              
              <RecommendationCard 
                title="Customer Success Team Expansion"
                description="Response times have increased by 15% in the last quarter. Based on growth projections, consider hiring 2 additional CSMs in the next 3 months."
                impact="High"
                category="Team Resources"
                effort="High"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Sentiment Trend</CardTitle>
                <CardDescription>
                  Analysis of customer conversations over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">Sentiment trend visualization would go here</span>
                </div>
                <div className="mt-4 space-y-2">
                  <TrendInsight 
                    title="Positive trend in UI/UX feedback"
                    description="Positive mentions of the new UI have increased by 27% since the latest release."
                  />
                  <TrendInsight 
                    title="Decreasing concerns about performance"
                    description="Mentions of performance issues have decreased by 18% in the last 30 days."
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Feature Usage Trends</CardTitle>
                <CardDescription>
                  Most and least used features over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">Feature usage visualization would go here</span>
                </div>
                <div className="mt-4 space-y-2">
                  <TrendInsight 
                    title="Analytics dashboard usage increasing"
                    description="Usage of the analytics dashboard has grown by 42% month-over-month."
                  />
                  <TrendInsight 
                    title="API integration underutilized"
                    description="Only 23% of eligible customers are using the API integration features."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="risks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Risk Assessment</CardTitle>
              <CardDescription>
                AI-detected potential risks requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RiskCard 
                customer="Acme Inc"
                risk="Churn Risk"
                probability={75}
                signals={[
                  { id: "signal-1", text: "Decreased usage in last 30 days" },
                  { id: "signal-2", text: "Support tickets about competitor features" },
                  { id: "signal-3", text: "Contract renewal in 45 days" }
                ]}
              />
              
              <RiskCard 
                customer="TechGiant"
                risk="Expansion Blocker"
                probability={62}
                signals={[
                  { id: "signal-4", text: "Multiple requests for enterprise features" },
                  { id: "signal-5", text: "Usage at subscription limit for 3 consecutive months" },
                  { id: "signal-6", text: "Competitor evaluation mentioned in recent call" }
                ]}
              />
              
              <RiskCard 
                customer="Global Services"
                risk="Adoption Issues"
                probability={58}
                signals={[
                  { id: "signal-7", text: "Only using 2 of 5 core features" },
                  { id: "signal-8", text: "Low engagement from admin users" },
                  { id: "signal-9", text: "Onboarding incomplete for 4 team members" }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RecommendationCard({ 
  title, 
  description, 
  impact, 
  category,
  effort
}: { 
  title: string; 
  description: string; 
  impact: "High" | "Medium" | "Low";
  category: string;
  effort: "High" | "Medium" | "Low";
}) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "text-green-500";
      case "Medium": return "text-amber-500";
      case "Low": return "text-blue-500";
      default: return "text-muted-foreground";
    }
  };
  
  const getEffortBadge = (effort: string) => {
    switch (effort) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "default";
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold">{title}</h4>
        <Badge variant="default">{category}</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium">Impact:</span>
          <span className={`text-xs font-semibold ${getImpactColor(impact)}`}>{impact}</span>
        </div>
        <Badge variant={getEffortBadge(effort) as "default" | "destructive" | "secondary" | "outline"}>
          {effort} Effort
        </Badge>
      </div>
    </div>
  );
}

function TrendInsight({ 
  title, 
  description 
}: { 
  title: string; 
  description: string;
}) {
  return (
    <div className="border rounded-lg p-3">
      <div className="flex items-center gap-2 mb-1">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <h4 className="font-medium text-sm">{title}</h4>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

// Define the signal type
interface Signal {
  id: string;
  text: string;
}

function RiskCard({ 
  customer, 
  risk, 
  probability, 
  signals 
}: { 
  customer: string; 
  risk: string; 
  probability: number;
  signals: Signal[];
}) {
  const getProbabilityColor = (prob: number) => {
    if (prob >= 70) return "text-red-500";
    if (prob >= 50) return "text-amber-500";
    return "text-blue-500";
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold">{customer}</h4>
          <div className="flex items-center gap-1 mt-1">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="text-sm">{risk}</span>
          </div>
        </div>
        <div className={`text-lg font-bold ${getProbabilityColor(probability)}`}>
          {probability}%
        </div>
      </div>
      <div className="mt-3">
        <h5 className="text-xs font-medium mb-1">Risk Signals:</h5>
        <ul className="text-xs text-muted-foreground space-y-1">
          {signals.map((signal) => (
            <li key={signal.id} className="flex items-start gap-1">
              <span className="text-muted-foreground">•</span>
              <span>{signal.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 