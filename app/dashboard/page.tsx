"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, ArrowUpRight, MessageSquare, LineChart, Brain } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome to your AI-powered customer success dashboard.
      </p>

      <Tabs defaultValue="overview" className="space-y-4 pt-2">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard 
              title="Total Customers" 
              value="284"
              description="↗︎ 15% from last month"
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard 
              title="Active Conversations" 
              value="32"
              description="↘︎ 5% from yesterday"
              icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard 
              title="Customer Satisfaction" 
              value="94%"
              description="↗︎ 2% from last week"
              icon={<ArrowUpRight className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard 
              title="AI Recommendations" 
              value="16"
              description="New suggestions today"
              icon={<Brain className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Customer Activity</CardTitle>
                <CardDescription>
                  Customer engagement over the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <LineChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">Chart visualization would go here</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Customer Health</CardTitle>
                <CardDescription>
                  Distribution of customer health scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">Chart visualization would go here</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>
                Data-driven recommendations for improving customer success
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <InsightCard 
                title="Churn Risk Detected"
                description="7 customers showing signs of decreased engagement. Consider proactive outreach."
                priority="high"
              />
              <InsightCard 
                title="Feature Adoption Opportunity"
                description="12 customers haven't tried your new reporting feature. Consider targeted campaign."
                priority="medium"
              />
              <InsightCard 
                title="Sentiment Analysis"
                description="Recent conversations show positive sentiment around new UI changes."
                priority="low"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
              <CardDescription>
                Detailed metrics and performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">Advanced analytics visualization would go here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MetricCard({ 
  title, 
  value, 
  description, 
  icon 
}: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function InsightCard({
  title,
  description,
  priority
}: {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-500";
      case "medium": return "text-amber-500";
      case "low": return "text-green-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-semibold">{title}</h4>
        <span className={`text-xs uppercase ${getPriorityColor(priority)}`}>
          {priority} priority
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
} 