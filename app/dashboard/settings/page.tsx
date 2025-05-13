"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Save, Bell, UserCog, Key, Bot, MessageSquare } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure your basic account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" placeholder="Your company name" defaultValue="Vortex Technologies" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://yourcompany.com" defaultValue="https://vortextech.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Brief description of your company" 
                  defaultValue="Vortex Technologies provides enterprise SaaS solutions for streamlining customer success operations."
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-8">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="utc+0">UTC</SelectItem>
                      <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                      <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                {saved ? "Saved!" : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <NotificationToggle defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Customer Activity Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when customers take important actions
                    </p>
                  </div>
                  <NotificationToggle defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">AI Insight Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts when AI detects important patterns
                    </p>
                  </div>
                  <NotificationToggle defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly summary reports via email
                    </p>
                  </div>
                  <NotificationToggle />
                </div>
              </div>
              
              <Button onClick={handleSave}>
                <Bell className="h-4 w-4 mr-2" />
                {saved ? "Saved!" : "Save Preferences"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>
                Manage team members and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Team Members</h3>
                  <Button variant="outline">
                    <UserCog className="h-4 w-4 mr-2" />
                    Invite Team Member
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <TeamMemberCard
                    name="John Smith"
                    email="john@vortextech.com"
                    role="Admin"
                  />
                  <TeamMemberCard
                    name="Sarah Johnson"
                    email="sarah@vortextech.com"
                    role="Customer Success Manager"
                  />
                  <TeamMemberCard
                    name="Michael Chen"
                    email="michael@vortextech.com"
                    role="Customer Success Manager"
                  />
                  <TeamMemberCard
                    name="Emily Davis"
                    email="emily@vortextech.com"
                    role="Support Specialist"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Configuration</CardTitle>
              <CardDescription>
                Configure AI behavior and automation settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">AI Response Automation</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow AI to automatically respond to common customer inquiries
                    </p>
                  </div>
                  <NotificationToggle defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">AI Insights Generation</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable AI to analyze customer data and generate insights
                    </p>
                  </div>
                  <NotificationToggle defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Proactive Risk Detection</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow AI to proactively identify potential customer risks
                    </p>
                  </div>
                  <NotificationToggle defaultChecked />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ai-model">AI Model</Label>
                <Select defaultValue="gpt4">
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt4">GPT-4 (Recommended)</SelectItem>
                    <SelectItem value="gpt35">GPT-3.5</SelectItem>
                    <SelectItem value="custom">Custom Model</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSave}>
                <Bot className="h-4 w-4 mr-2" />
                {saved ? "Saved!" : "Save AI Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Live API Key</Label>
                <div className="flex">
                  <Input
                    readOnly
                    value="sk_live_•••••••••••••••••••••••••••••"
                    className="font-mono text-sm"
                  />
                  <Button variant="outline" className="ml-2">
                    Copy
                  </Button>
                  <Button variant="outline" className="ml-2">
                    Regenerate
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Test API Key</Label>
                <div className="flex">
                  <Input
                    readOnly
                    value="sk_test_•••••••••••••••••••••••••••••"
                    className="font-mono text-sm"
                  />
                  <Button variant="outline" className="ml-2">
                    Copy
                  </Button>
                  <Button variant="outline" className="ml-2">
                    Regenerate
                  </Button>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-3">Active Integrations</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>Slack Integration</span>
                    </div>
                    <Badge variant="outline">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      <span>Zendesk Integration</span>
                    </div>
                    <Badge variant="outline">Connected</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function NotificationToggle({ defaultChecked = false }) {
  const [enabled, setEnabled] = useState(defaultChecked);
  
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          enabled ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
        }`}
        onClick={() => setEnabled(!enabled)}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <span className="text-sm text-muted-foreground">
        {enabled ? "On" : "Off"}
      </span>
    </div>
  );
}

function TeamMemberCard({ name, email, role }: { name: string; email: string; role: string }) {
  return (
    <div className="flex justify-between items-center p-3 border rounded-md">
      <div>
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="secondary">{role}</Badge>
        <Button variant="ghost" size="icon">
          <UserCog className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </div>
    </div>
  );
} 