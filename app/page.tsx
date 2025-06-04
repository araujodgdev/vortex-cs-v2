"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, Brain, CheckCircle, MessageSquare, Users } from "lucide-react";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedElement } from "@/components/ui/animated-element";
import { HoverEffect } from "@/components/ui/hover-effect";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-background">
        <motion.header
          className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-4 border-b border-border flex flex-row justify-between items-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <motion.span 
              className="font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Vortex CS
            </motion.span>
          </div>
          <div className="flex items-center gap-4">
            <SignedIn>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">Entrar</Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Cadastrar
                </Button>
              </Link>
            </SignedOut>
          </div>
        </motion.header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
            <div className="max-w-6xl mx-auto text-center">
              <AnimatedElement type="fade">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Plataforma de <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Customer Success</span> com Inteligência Artificial
                </h1>
              </AnimatedElement>
              
              <AnimatedElement type="fade" delay={0.2}>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                  Otimize a gestão do relacionamento com clientes B2B, consolide interações, feedback e acompanhe o progresso de projetos com insights de IA.
                </p>
              </AnimatedElement>
              
              <AnimatedElement type="slideUp" delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <SignedIn>
                    <Link href="/dashboard">
                      <Button size="lg" className="w-full sm:w-auto group bg-primary text-primary-foreground hover:bg-primary/90">
                        Acessar Dashboard
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </SignedIn>
                  <SignedOut>
                    <Link href="/sign-up">
                      <Button size="lg" className="w-full sm:w-auto group bg-primary text-primary-foreground hover:bg-primary/90">
                        Começar Agora
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary/20 hover:bg-primary/10">
                        Entrar na Plataforma
                      </Button>
                    </Link>
                  </SignedOut>
                </div>
              </AnimatedElement>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 px-4 md:px-6 lg:px-8 bg-card">
            <div className="max-w-6xl mx-auto">
              <AnimatedElement type="fade">
                <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades Principais</h2>
              </AnimatedElement>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatedElement type="scale" delay={0.1}>
                  <FeatureCard 
                    icon={<Users className="text-primary h-6 w-6" />}
                    title="Gerenciamento de Clientes"
                    description="Cadastro e edição de informações de clientes B2B, com gerenciamento de múltiplos projetos por cliente."
                  />
                </AnimatedElement>
                
                <AnimatedElement type="scale" delay={0.2}>
                  <FeatureCard 
                    icon={<BarChart className="text-primary h-6 w-6" />}
                    title="Dashboard de Status"
                    description="Visualização centralizada do andamento de todos os projetos com indicadores visuais de progresso."
                  />
                </AnimatedElement>
                
                <AnimatedElement type="scale" delay={0.3}>
                  <FeatureCard 
                    icon={<CheckCircle className="text-primary h-6 w-6" />}
                    title="Avaliações de Satisfação"
                    description="Criação e envio de formulários de avaliação (NPS, CSAT, MHS) com visualização de histórico."
                  />
                </AnimatedElement>
                
                <AnimatedElement type="scale" delay={0.4}>
                  <FeatureCard 
                    icon={<MessageSquare className="text-primary h-6 w-6" />}
                    title="Gestão de Feedback"
                    description="Interface para clientes registrarem feedbacks e painel para a equipe de CS visualizar e responder."
                  />
                </AnimatedElement>
                
                <AnimatedElement type="scale" delay={0.5}>
                  <FeatureCard 
                    icon={<Brain className="text-primary h-6 w-6" />}
                    title="Insights com IA"
                    description="Análise de sentimento, extração de tópicos chave e predição de churn com inteligência artificial."
                  />
                </AnimatedElement>
                
                <AnimatedElement type="scale" delay={0.6}>
                  <FeatureCard 
                    icon={<ArrowRight className="text-primary h-6 w-6" />}
                    title="Integrações"
                    description="Conexão com Jira, Power BI e outras ferramentas para sincronização de dados e análises avançadas."
                  />
                </AnimatedElement>
              </div>
            </div>
          </section>
        </main>

        <motion.footer 
          className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="max-w-6xl mx-auto text-center text-sm text-slate-600 dark:text-slate-400">
            <p>© {new Date().getFullYear()} Vortex CS - Plataforma de Customer Success com IA</p>
          </div>
        </motion.footer>
      </div>
    </PageTransition>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <HoverEffect className="bg-background/50 p-6 rounded-lg border border-border">
      <div className="mb-4 p-2 inline-block rounded-full bg-primary/10">
        <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 400 }}>
          {icon}
        </motion.div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </HoverEffect>
  );
}
