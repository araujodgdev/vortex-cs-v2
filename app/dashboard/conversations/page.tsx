"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, Bot, User } from "lucide-react";

// Define the conversation type
interface Conversation {
  id: string;
  customer: string;
  subject: string;
  snippet: string;
  date: string;
  unread: boolean;
  status: string;
  assignee: string;
}

export default function ConversationsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const conversations: Conversation[] = [
    {
      id: "1",
      customer: "Acme Inc",
      subject: "Implementation Support",
      snippet: "We're having trouble with the API integration...",
      date: "Today, 10:23 AM",
      unread: true,
      status: "Open",
      assignee: "AI Assistant",
    },
    {
      id: "2",
      customer: "TechGiant",
      subject: "Feature Request",
      snippet: "Is it possible to add custom reporting to the dashboard?",
      date: "Yesterday, 2:45 PM",
      unread: false,
      status: "Open",
      assignee: "Sarah Johnson",
    },
    {
      id: "3",
      customer: "Innovate Co",
      subject: "Billing Question",
      snippet: "Our last invoice seems to have an error...",
      date: "May 15, 2024",
      unread: false,
      status: "Closed",
      assignee: "AI Assistant",
    },
    {
      id: "4",
      customer: "Global Services",
      subject: "Onboarding Call Request",
      snippet: "We'd like to schedule an onboarding call for our new team members",
      date: "May 12, 2024",
      unread: false,
      status: "Open",
      assignee: "Michael Chen",
    },
    {
      id: "5",
      customer: "Future Tech",
      subject: "Product Feedback",
      snippet: "The new update is amazing! We especially love...",
      date: "May 10, 2024",
      unread: false,
      status: "Closed",
      assignee: "AI Assistant",
    },
  ];

  const filteredConversations = conversations.filter((conversation) =>
    conversation.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
          <p className="text-muted-foreground">
            Manage customer conversations and support tickets
          </p>
        </div>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </div>

      <div className="flex w-full items-center space-x-2 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations..."
          className="flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
        />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="ai-handled">AI Handled</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {filteredConversations.map((conversation) => (
            <ConversationCard key={conversation.id} conversation={conversation} />
          ))}
          {filteredConversations.length === 0 && (
            <EmptyState message="No conversations found." />
          )}
        </TabsContent>
        
        <TabsContent value="open" className="space-y-4">
          {filteredConversations
            .filter(c => c.status === "Open")
            .map((conversation) => (
              <ConversationCard key={conversation.id} conversation={conversation} />
            ))}
          {filteredConversations.filter(c => c.status === "Open").length === 0 && (
            <EmptyState message="No open conversations." />
          )}
        </TabsContent>
        
        <TabsContent value="ai-handled" className="space-y-4">
          {filteredConversations
            .filter(c => c.assignee === "AI Assistant")
            .map((conversation) => (
              <ConversationCard key={conversation.id} conversation={conversation} />
            ))}
          {filteredConversations.filter(c => c.assignee === "AI Assistant").length === 0 && (
            <EmptyState message="No AI-handled conversations." />
          )}
        </TabsContent>
        
        <TabsContent value="closed" className="space-y-4">
          {filteredConversations
            .filter(c => c.status === "Closed")
            .map((conversation) => (
              <ConversationCard key={conversation.id} conversation={conversation} />
            ))}
          {filteredConversations.filter(c => c.status === "Closed").length === 0 && (
            <EmptyState message="No closed conversations." />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ConversationCard({ conversation }: { conversation: Conversation }) {
  return (
    <Card className={conversation.unread ? "border-primary/50" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">
                {conversation.subject}
              </CardTitle>
              {conversation.unread && (
                <Badge variant="default" className="text-xs">New</Badge>
              )}
            </div>
            <CardDescription>{conversation.customer}</CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">
            {conversation.date}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{conversation.snippet}</p>
        <div className="flex justify-between items-center">
          <Badge variant={conversation.status === "Open" ? "outline" : "secondary"}>
            {conversation.status}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            {conversation.assignee === "AI Assistant" ? (
              <>
                <Bot className="h-3 w-3" />
                <span>AI Assisted</span>
              </>
            ) : (
              <>
                <User className="h-3 w-3" />
                <span>{conversation.assignee}</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">{message}</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Conversations will appear here when they are created.
      </p>
    </div>
  );
} 