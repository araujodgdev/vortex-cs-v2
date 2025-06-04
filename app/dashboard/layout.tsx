"use client";

import { UserButton } from "@clerk/nextjs";
import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
      <motion.aside 
        className="fixed inset-y-0 left-0 w-64 bg-background border-r border-border hidden md:flex flex-col"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="p-6 border-b border-border">
          <h2 className="text-2xl font-bold">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
            >
              Vortex CS
            </motion.span>
          </h2>
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            Plataforma de Customer Success
          </motion.p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <AnimatedNavItem href="/dashboard" icon={<Home className="h-5 w-5" />} delay={0.1}>
              Dashboard
            </AnimatedNavItem>
            <AnimatedNavItem href="/dashboard/customers" icon={<Users className="h-5 w-5" />} delay={0.2}>
              Clientes
            </AnimatedNavItem>
            <AnimatedNavItem href="/dashboard/analytics" icon={<BarChart3 className="h-5 w-5" />} delay={0.3}>
              Analytics
            </AnimatedNavItem>
            <AnimatedNavItem href="/dashboard/conversations" icon={<MessageSquare className="h-5 w-5" />} delay={0.4}>
              Conversas
            </AnimatedNavItem>
            <AnimatedNavItem href="/dashboard/ai-insights" icon={<Bot className="h-5 w-5" />} delay={0.5}>
              Insights IA
            </AnimatedNavItem>
            <AnimatedNavItem href="/dashboard/settings" icon={<Settings className="h-5 w-5" />} delay={0.6}>
              Configurações
            </AnimatedNavItem>
          </ul>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="md:pl-64">
        {/* Header */}
        <motion.header 
          className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border h-16 flex items-center px-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex-1 md:hidden">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Vortex CS
            </h2>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <UserButton afterSignOutUrl="/" />
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function AnimatedNavItem({ 
  href, 
  icon, 
  children,
  delay = 0
}: { 
  href: string; 
  icon: ReactNode; 
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.li
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors",
          "text-muted-foreground hover:text-foreground hover:bg-primary/10",
          "aria-[current=page]:text-primary aria-[current=page]:bg-primary/10"
        )}
      >
        {icon}
        <span>{children}</span>
      </Link>
    </motion.li>
  );
} 