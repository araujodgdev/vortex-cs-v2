"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Users, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedElement } from "@/components/ui/animated-element";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

interface Signal {
  id: string;
  text: string;
}

interface Insight {
  type: 'recommendation' | 'trend' | 'risk';
  title: string;
  description: string;
  impact?: string;
  category?: string;
  effort?: string;
  customer?: string;
  risk?: string;
  probability?: number;
  signals?: Signal[];
}

export default function AIInsightsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);

  const handleGenerateInsights = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/insights/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setInsights(data.insights);
      toast.success('Novos insights gerados com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar insights:', error);
      toast.error('Erro ao gerar novos insights. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

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
              <Button onClick={handleGenerateInsights} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Gerando Insights...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Gerar Novos Insights
                  </>
                )}
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
                {insights
                  .filter(insight => insight.type === 'recommendation')
                  .map((insight, index) => (
                    <AnimatedElement key={index} type="slide" delay={0.1 * index}>
                      <RecommendationCard 
                        title={insight.title}
                        description={insight.description}
                        impact={insight.impact as "Alta" | "Média" | "Baixa"}
                        category={insight.category || ""}
                        effort={insight.effort as "Alta" | "Média" | "Baixa"}
                      />
                    </AnimatedElement>
                  ))}
                {insights.filter(insight => insight.type === 'recommendation').length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhuma recomendação disponível. Gere novos insights para ver recomendações.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tendências de Sucesso do Cliente</CardTitle>
                <CardDescription>
                  Análise de tendências e padrões identificados pela IA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights
                  .filter(insight => insight.type === 'trend')
                  .map((insight, index) => (
                    <AnimatedElement key={index} type="slide" delay={0.1 * index}>
                      <TrendInsight 
                        title={insight.title}
                        description={insight.description}
                      />
                    </AnimatedElement>
                  ))}
                {insights.filter(insight => insight.type === 'trend').length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhuma tendência disponível. Gere novos insights para ver análises de tendências.
                  </div>
                )}
              </CardContent>
            </Card>
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
                {insights
                  .filter(insight => insight.type === 'risk')
                  .map((insight, index) => (
                    <AnimatedElement key={index} type="slide" delay={0.1 * index}>
                      <RiskCard 
                        customer={insight.customer || ""}
                        risk={insight.risk || ""}
                        probability={insight.probability || 0}
                        signals={insight.signals || []}
                      />
                    </AnimatedElement>
                  ))}
                {insights.filter(insight => insight.type === 'risk').length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum risco detectado. Gere novos insights para ver avaliações de risco.
                  </div>
                )}
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