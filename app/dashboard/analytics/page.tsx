"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart, PieChart, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedElement } from "@/components/ui/animated-element";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  return (
    <PageTransition>
      <div className="flex flex-col gap-5">
        <AnimatedElement type="fade">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Análises</h1>
              <p className="text-muted-foreground">
                Métricas de sucesso do cliente e indicadores de desempenho
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="30d">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                  <SelectItem value="90d">Últimos 90 dias</SelectItem>
                  <SelectItem value="12m">Últimos 12 meses</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement type="fade" delay={0.2}>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="engagement">Engajamento</TabsTrigger>
              <TabsTrigger value="retention">Retenção</TabsTrigger>
              <TabsTrigger value="growth">Crescimento</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <AnimatedElement type="slide" delay={0.1}>
                  <MetricCard 
                    title="Satisfação do Cliente" 
                    value="94%"
                    change="+2%"
                    trend="up"
                  />
                </AnimatedElement>
                <AnimatedElement type="slide" delay={0.2}>
                  <MetricCard 
                    title="Taxa de Retenção" 
                    value="108%"
                    change="+3%"
                    trend="up"
                  />
                </AnimatedElement>
                <AnimatedElement type="slide" delay={0.3}>
                  <MetricCard 
                    title="Tempo Médio de Resposta" 
                    value="1.4h"
                    change="-12%"
                    trend="up"
                  />
                </AnimatedElement>
                <AnimatedElement type="slide" delay={0.4}>
                  <MetricCard 
                    title="Taxa de Abandono" 
                    value="2.1%"
                    change="-0.5%"
                    trend="up"
                  />
                </AnimatedElement>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <AnimatedElement type="fade" delay={0.5}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Crescimento de Clientes</CardTitle>
                      <CardDescription>
                        Novos clientes e abandonos ao longo do tempo
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                          <BarChart3 className="h-8 w-8 text-muted-foreground" />
                          <span className="ml-2 text-sm text-muted-foreground">Gráfico de crescimento de clientes seria exibido aqui</span>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedElement>
                
                <AnimatedElement type="fade" delay={0.6}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Métricas de Receita</CardTitle>
                      <CardDescription>
                        MRR, ARR e receita de expansão
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                          <LineChart className="h-8 w-8 text-muted-foreground" />
                          <span className="ml-2 text-sm text-muted-foreground">Gráfico de métricas de receita seria exibido aqui</span>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedElement>
              </div>
            </TabsContent>
            
            <TabsContent value="engagement" className="space-y-4">
              <AnimatedElement type="fade">
                <Card>
                  <CardHeader>
                    <CardTitle>Métricas de Engajamento</CardTitle>
                    <CardDescription>
                      Padrões de uso e indicadores de engajamento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Distribuição de Uso de Recursos</h3>
                        <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                            <PieChart className="h-8 w-8 text-muted-foreground" />
                            <span className="ml-2 text-sm text-muted-foreground">Gráfico de uso de recursos seria exibido aqui</span>
                          </motion.div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Usuários Ativos Diários</h3>
                        <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                            <LineChart className="h-8 w-8 text-muted-foreground" />
                            <span className="ml-2 text-sm text-muted-foreground">Gráfico de UAD seria exibido aqui</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Tendência de Duração de Sessão</h3>
                      <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                          <LineChart className="h-8 w-8 text-muted-foreground" />
                          <span className="ml-2 text-sm text-muted-foreground">Gráfico de duração de sessão seria exibido aqui</span>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </TabsContent>
            
            <TabsContent value="retention" className="space-y-4">
              <AnimatedElement type="fade">
                <Card>
                  <CardHeader>
                    <CardTitle>Análise de Retenção de Clientes</CardTitle>
                    <CardDescription>
                      Taxas de retenção e métricas de ciclo de vida do cliente
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Retenção por Coorte</h3>
                        <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                            <BarChart3 className="h-8 w-8 text-muted-foreground" />
                            <span className="ml-2 text-sm text-muted-foreground">Gráfico de retenção por coorte seria exibido aqui</span>
                          </motion.div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Motivos de Abandono</h3>
                        <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                            <PieChart className="h-8 w-8 text-muted-foreground" />
                            <span className="ml-2 text-sm text-muted-foreground">Gráfico de motivos de abandono seria exibido aqui</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Valor Vitalício do Cliente</h3>
                      <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                          <LineChart className="h-8 w-8 text-muted-foreground" />
                          <span className="ml-2 text-sm text-muted-foreground">Gráfico de VVC seria exibido aqui</span>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </TabsContent>
            
            <TabsContent value="growth" className="space-y-4">
              <AnimatedElement type="fade">
                <Card>
                  <CardHeader>
                    <CardTitle>Métricas de Crescimento</CardTitle>
                    <CardDescription>
                      Análises de expansão, upsell e cross-sell
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Receita de Expansão</h3>
                        <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                            <LineChart className="h-8 w-8 text-muted-foreground" />
                            <span className="ml-2 text-sm text-muted-foreground">Gráfico de receita de expansão seria exibido aqui</span>
                          </motion.div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Distribuição de Planos</h3>
                        <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                            <PieChart className="h-8 w-8 text-muted-foreground" />
                            <span className="ml-2 text-sm text-muted-foreground">Gráfico de distribuição de planos seria exibido aqui</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Taxa de Conversão de Upgrade</h3>
                      <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                          <BarChart3 className="h-8 w-8 text-muted-foreground" />
                          <span className="ml-2 text-sm text-muted-foreground">Gráfico de conversão de upgrade seria exibido aqui</span>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </TabsContent>
          </Tabs>
        </AnimatedElement>
      </div>
    </PageTransition>
  );
}

function MetricCard({ 
  title, 
  value, 
  change, 
  trend 
}: { 
  title: string; 
  value: string; 
  change: string;
  trend: "up" | "down";
}) {
  const isPositive = trend === "up";
  // Para métricas como "tempo de resposta", uma diminuição é realmente positiva
  const isInverted = title.toLowerCase().includes("tempo") || title.toLowerCase().includes("abandono");
  const isGood = isInverted ? !isPositive : isPositive;
  
  return (
    <motion.div whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }} transition={{ type: "spring", stiffness: 400 }}>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className={`text-xs ${isGood ? "text-green-500" : "text-red-500"} flex items-center mt-1`}>
            {change}
            <span className="ml-1">em relação ao período anterior</span>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
} 