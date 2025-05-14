"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedElement } from "@/components/ui/animated-element";
import { motion } from "framer-motion";

export default function AIInsightsPage() {
  return (
    <PageTransition>
      <div className="flex flex-col gap-5">
        <AnimatedElement type="fade">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Insights de IA</h1>
              <p className="text-muted-foreground">
                Recomendações e insights baseados em IA para o sucesso do cliente
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button>
                <Brain className="h-4 w-4 mr-2" />
                Gerar Novos Insights
              </Button>
            </motion.div>
          </div>
        </AnimatedElement>

        <Tabs defaultValue="recommendations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
            <TabsTrigger value="trends">Análise de Tendências</TabsTrigger>
            <TabsTrigger value="risks">Detecção de Riscos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recomendações de Sucesso do Cliente</CardTitle>
                <CardDescription>
                  Recomendações geradas por IA para melhorar as métricas de sucesso do cliente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatedElement type="slide" delay={0.1}>
                  <RecommendationCard 
                    title="Melhoria do Processo de Onboarding"
                    description="A análise de sessões recentes de onboarding sugere que os clientes enfrentam dificuldades na etapa de integração da API. Considere criar documentação adicional ou tutoriais em vídeo."
                    impact="Alta"
                    category="Onboarding"
                    effort="Média"
                  />
                </AnimatedElement>
                
                <AnimatedElement type="slide" delay={0.2}>
                  <RecommendationCard 
                    title="Campanha de Adoção de Recursos"
                    description="12 clientes empresariais não utilizaram os novos recursos de relatórios. Uma campanha de email direcionada com casos de uso poderia aumentar a adoção em cerca de 35%."
                    impact="Média"
                    category="Adoção de Recursos"
                    effort="Baixa"
                  />
                </AnimatedElement>
                
                <AnimatedElement type="slide" delay={0.3}>
                  <RecommendationCard 
                    title="Expansão da Equipe de Sucesso do Cliente"
                    description="Os tempos de resposta aumentaram 15% no último trimestre. Com base nas projeções de crescimento, considere contratar 2 CSMs adicionais nos próximos 3 meses."
                    impact="Alta"
                    category="Recursos da Equipe"
                    effort="Alta"
                  />
                </AnimatedElement>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tendência de Sentimento do Cliente</CardTitle>
                  <CardDescription>
                    Análise de conversas com clientes ao longo do tempo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">Visualização de tendência de sentimento seria exibida aqui</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <TrendInsight 
                      title="Tendência positiva no feedback sobre UI/UX"
                      description="Menções positivas sobre a nova UI aumentaram 27% desde o último lançamento."
                    />
                    <TrendInsight 
                      title="Redução nas preocupações sobre desempenho"
                      description="Menções de problemas de desempenho diminuíram 18% nos últimos 30 dias."
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tendências de Uso de Recursos</CardTitle>
                  <CardDescription>
                    Recursos mais e menos utilizados ao longo do tempo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">Visualização de uso de recursos seria exibida aqui</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <TrendInsight 
                      title="Uso do dashboard de análises em crescimento"
                      description="O uso do dashboard de análises cresceu 42% mês a mês."
                    />
                    <TrendInsight 
                      title="Integração de API subutilizada"
                      description="Apenas 23% dos clientes elegíveis estão usando os recursos de integração de API."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="risks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Avaliação de Risco do Cliente</CardTitle>
                <CardDescription>
                  Riscos potenciais detectados por IA que requerem atenção
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RiskCard 
                  customer="Acme Inc"
                  risk="Risco de Churn"
                  probability={75}
                  signals={[
                    { id: "signal-1", text: "Uso reduzido nos últimos 30 dias" },
                    { id: "signal-2", text: "Tickets de suporte sobre recursos de concorrentes" },
                    { id: "signal-3", text: "Renovação de contrato em 45 dias" }
                  ]}
                />
                
                <RiskCard 
                  customer="TechGiant"
                  risk="Bloqueador de Expansão"
                  probability={62}
                  signals={[
                    { id: "signal-4", text: "Múltiplos pedidos de recursos empresariais" },
                    { id: "signal-5", text: "Uso no limite da assinatura por 3 meses consecutivos" },
                    { id: "signal-6", text: "Avaliação de concorrente mencionada em chamada recente" }
                  ]}
                />
                
                <RiskCard 
                  customer="Global Services"
                  risk="Problemas de Adoção"
                  probability={58}
                  signals={[
                    { id: "signal-7", text: "Usando apenas 2 de 5 recursos principais" },
                    { id: "signal-8", text: "Baixo engajamento de usuários administradores" },
                    { id: "signal-9", text: "Onboarding incompleto para 4 membros da equipe" }
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
}

function RecommendationCard({ 
  title, 
  description, 
  impact, 
  category,
  effort
}: { 
  title: string; 
  description: string; 
  impact: "Alta" | "Média" | "Baixa";
  category: string;
  effort: "Alta" | "Média" | "Baixa";
}) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Alta": return "text-green-500";
      case "Média": return "text-amber-500";
      case "Baixa": return "text-blue-500";
      default: return "text-muted-foreground";
    }
  };
  
  const getEffortBadge = (effort: string) => {
    switch (effort) {
      case "Alta": return "destructive";
      case "Média": return "secondary";
      case "Baixa": return "outline";
      default: return "default";
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold">{title}</h4>
        <Badge variant="default">{category}</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium">Impacto:</span>
          <span className={`text-xs font-semibold ${getImpactColor(impact)}`}>{impact}</span>
        </div>
        <Badge variant={getEffortBadge(effort) as "default" | "destructive" | "secondary" | "outline"}>
          Esforço {effort}
        </Badge>
      </div>
    </div>
  );
}

function TrendInsight({ 
  title, 
  description 
}: { 
  title: string; 
  description: string;
}) {
  return (
    <div className="border rounded-lg p-3">
      <div className="flex items-center gap-2 mb-1">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <h4 className="font-medium text-sm">{title}</h4>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

// Define the signal type
interface Signal {
  id: string;
  text: string;
}

function RiskCard({ 
  customer, 
  risk, 
  probability, 
  signals 
}: { 
  customer: string; 
  risk: string; 
  probability: number;
  signals: Signal[];
}) {
  const getProbabilityColor = (prob: number) => {
    if (prob >= 70) return "text-red-500";
    if (prob >= 50) return "text-amber-500";
    return "text-blue-500";
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold">{customer}</h4>
          <div className="flex items-center gap-1 mt-1">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="text-sm">{risk}</span>
          </div>
        </div>
        <div className={`text-lg font-bold ${getProbabilityColor(probability)}`}>
          {probability}%
        </div>
      </div>
      <div className="mt-3">
        <h5 className="text-xs font-medium mb-1">Sinais de Risco:</h5>
        <ul className="text-xs text-muted-foreground space-y-1">
          {signals.map((signal) => (
            <li key={signal.id} className="flex items-start gap-1">
              <span className="text-muted-foreground">•</span>
              <span>{signal.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 