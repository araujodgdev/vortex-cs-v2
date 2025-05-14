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
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
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
            Customer Success com IA
          </motion.p>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <AnimatedNavItem href="/dashboard" icon={<Home className="w-5 h-5" />} delay={0.2}>
              Visão Geral
            </AnimatedNavItem>
            <AnimatedNavItem href="/dashboard/customers" icon={<Users className="w-5 h-5" />} delay={0.3}>
              Clientes
            </AnimatedNavItem>
            <AnimatedNavItem href="/dashboard/conversations" icon={<MessageSquare className="w-5 h-5" />} delay={0.4}>
              Conversas
            </AnimatedNavItem>
            <AnimatedNavItem href="/dashboard/analytics" icon={<BarChart3 className="w-5 h-5" />} delay={0.5}>
              Análises
            </AnimatedNavItem>
            <AnimatedNavItem href="/dashboard/ai-insights" icon={<Bot className="w-5 h-5" />} delay={0.6}>
              Insights IA
            </AnimatedNavItem>
            <AnimatedNavItem href="/dashboard/settings" icon={<Settings className="w-5 h-5" />} delay={0.7}>
              Configurações
            </AnimatedNavItem>
          </ul>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="md:pl-64">
        {/* Header */}
        <motion.header 
          className="sticky top-0 z-10 bg-background border-b h-16 flex items-center px-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex-1 md:hidden">
            <h2 className="text-lg font-semibold">Vortex CS</h2>
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Link 
        href={href} 
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground",
          "transition-colors relative group"
        )}
      >
        <motion.span 
          whileHover={{ rotate: 15, scale: 1.1 }} 
          transition={{ type: "spring", stiffness: 400 }}
        >
          {icon}
        </motion.span>
        <span>{children}</span>
        <motion.span 
          className="absolute inset-0 rounded-md bg-accent/0 pointer-events-none"
          whileHover={{ backgroundColor: "rgba(var(--accent) / 0.1)" }}
          transition={{ duration: 0.2 }}
        />
      </Link>
    </motion.li>
  );
} 