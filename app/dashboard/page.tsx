"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, ArrowUpRight, MessageSquare, LineChart, Brain } from "lucide-react";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedElement } from "@/components/ui/animated-element";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <PageTransition>
      <div className="flex flex-col gap-5">
        <AnimatedElement type="fade">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao seu dashboard de customer success com IA.
          </p>
        </AnimatedElement>

        <Tabs defaultValue="overview" className="space-y-4 pt-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="insights">Insights IA</TabsTrigger>
              <TabsTrigger value="analytics">Análises</TabsTrigger>
            </TabsList>
          </motion.div>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <AnimatedElement type="slide" delay={0.1}>
                <MetricCard 
                  title="Total de Clientes" 
                  value="284"
                  description="↗︎ 15% em relação ao mês passado"
                  icon={<Users className="h-4 w-4 text-muted-foreground" />}
                />
              </AnimatedElement>
              
              <AnimatedElement type="slide" delay={0.2}>
                <MetricCard 
                  title="Conversas Ativas" 
                  value="32"
                  description="↘︎ 5% em relação a ontem"
                  icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
                />
              </AnimatedElement>
              
              <AnimatedElement type="slide" delay={0.3}>
                <MetricCard 
                  title="Satisfação do Cliente" 
                  value="94%"
                  description="↗︎ 2% em relação à semana passada"
                  icon={<ArrowUpRight className="h-4 w-4 text-muted-foreground" />}
                />
              </AnimatedElement>
              
              <AnimatedElement type="slide" delay={0.4}>
                <MetricCard 
                  title="Recomendações IA" 
                  value="16"
                  description="Novas sugestões hoje"
                  icon={<Brain className="h-4 w-4 text-muted-foreground" />}
                />
              </AnimatedElement>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <AnimatedElement className="col-span-4" type="fade" delay={0.5}>
                <Card>
                  <CardHeader>
                    <CardTitle>Atividade do Cliente</CardTitle>
                    <CardDescription>
                      Engajamento de clientes nos últimos 30 dias
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                      >
                        <LineChart className="h-8 w-8 text-muted-foreground" />
                        <span className="ml-2 text-sm text-muted-foreground">Visualização do gráfico iria aqui</span>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
              
              <AnimatedElement className="col-span-3" type="fade" delay={0.6}>
                <Card>
                  <CardHeader>
                    <CardTitle>Saúde do Cliente</CardTitle>
                    <CardDescription>
                      Distribuição de pontuações de saúde dos clientes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                      >
                        <BarChart3 className="h-8 w-8 text-muted-foreground" />
                        <span className="ml-2 text-sm text-muted-foreground">Visualização do gráfico iria aqui</span>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <AnimatedElement type="fade">
              <Card>
                <CardHeader>
                  <CardTitle>Insights com IA</CardTitle>
                  <CardDescription>
                    Recomendações baseadas em dados para melhorar o sucesso do cliente
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnimatedElement type="slide" delay={0.1}>
                    <InsightCard 
                      title="Risco de Churn Detectado"
                      description="7 clientes mostram sinais de diminuição de engajamento. Considere uma abordagem proativa."
                      priority="high"
                    />
                  </AnimatedElement>
                  
                  <AnimatedElement type="slide" delay={0.2}>
                    <InsightCard 
                      title="Oportunidade de Adoção de Recursos"
                      description="12 clientes ainda não experimentaram seu novo recurso de relatórios. Considere uma campanha direcionada."
                      priority="medium"
                    />
                  </AnimatedElement>
                  
                  <AnimatedElement type="slide" delay={0.3}>
                    <InsightCard 
                      title="Análise de Sentimento"
                      description="Conversas recentes mostram sentimento positivo em relação às mudanças na interface."
                      priority="low"
                    />
                  </AnimatedElement>
                </CardContent>
              </Card>
            </AnimatedElement>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <AnimatedElement type="fade">
              <Card>
                <CardHeader>
                  <CardTitle>Análise de Clientes</CardTitle>
                  <CardDescription>
                    Métricas detalhadas e indicadores de desempenho
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <BarChart3 className="h-8 w-8 text-muted-foreground" />
                      <span className="ml-2 text-sm text-muted-foreground">Visualização de análises avançadas iria aqui</span>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedElement>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
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
    <motion.div whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }} transition={{ type: "spring", stiffness: 400 }}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
            {icon}
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
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

  const priorityTranslation = (priority: string) => {
    switch (priority) {
      case "high": return "alta";
      case "medium": return "média";
      case "low": return "baixa";
      default: return priority;
    }
  };

  return (
    <motion.div 
      className="border rounded-lg p-4 overflow-hidden"
      whileHover={{ 
        scale: 1.01, 
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        borderColor: priority === "high" ? "#f87171" : priority === "medium" ? "#fbbf24" : "#34d399"
      }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-semibold">{title}</h4>
        <span className={`text-xs uppercase ${getPriorityColor(priority)}`}>
          prioridade {priorityTranslation(priority)}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
} 