"use client";

import { UserButton } from "@clerk/nextjs";
import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  BarChart, 
  Settings,
  Home,
  Bot
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-background border-r border-border hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">Vortex CS</h2>
          <p className="text-sm text-muted-foreground">AI-Powered Customer Success</p>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <NavItem href="/dashboard" icon={<Home className="w-5 h-5" />}>
              Overview
            </NavItem>
            <NavItem href="/dashboard/customers" icon={<Users className="w-5 h-5" />}>
              Customers
            </NavItem>
            <NavItem href="/dashboard/conversations" icon={<MessageSquare className="w-5 h-5" />}>
              Conversations
            </NavItem>
            <NavItem href="/dashboard/analytics" icon={<BarChart3 className="w-5 h-5" />}>
              Analytics
            </NavItem>
            <NavItem href="/dashboard/ai-insights" icon={<Bot className="w-5 h-5" />}>
              AI Insights
            </NavItem>
            <NavItem href="/dashboard/settings" icon={<Settings className="w-5 h-5" />}>
              Settings
            </NavItem>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="md:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background border-b h-16 flex items-center px-6">
          <div className="flex-1 md:hidden">
            <h2 className="text-lg font-semibold">Vortex CS</h2>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({ 
  href, 
  icon, 
  children 
}: { 
  href: string; 
  icon: ReactNode; 
  children: ReactNode 
}) {
  return (
    <li>
      <Link 
        href={href} 
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground",
          "transition-colors"
        )}
      >
        {icon}
        <span>{children}</span>
      </Link>
    </li>
  );
} 