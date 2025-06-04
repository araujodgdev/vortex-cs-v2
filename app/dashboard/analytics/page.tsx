"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart, PieChart, Calendar as CalendarIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedElement } from "@/components/ui/animated-element";
import { motion } from "framer-motion";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDownload = () => {
    // Aqui você pode implementar a lógica de download dos dados
    // Por exemplo, gerar um CSV com os dados do período selecionado
    const data = {
      period: selectedPeriod,
      dateRange,
      // Adicione aqui os dados que você quer exportar
    };
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `analytics-${format(new Date(), "yyyy-MM-dd")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <PageTransition>
      <div className="flex flex-col gap-6">
        <AnimatedElement type="fade">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
              <p className="text-muted-foreground">
                Acompanhe as métricas e insights do seu negócio
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select 
                defaultValue="30d"
                value={selectedPeriod}
                onValueChange={setSelectedPeriod}
              >
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
              <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                          {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
                        </>
                      ) : (
                        format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
                      )
                    ) : (
                      <span>Selecione um período</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from || new Date()}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    locale={ptBR}
                    weekStartsOn={0}
                    ISOWeek={false}
                  />
                </PopoverContent>
              </Popover>
              <Button variant="outline" size="icon" onClick={handleDownload}>
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