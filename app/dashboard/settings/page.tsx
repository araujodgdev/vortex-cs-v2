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
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedElement } from "@/components/ui/animated-element";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <PageTransition>
      <div className="flex flex-col gap-5">
        <AnimatedElement type="fade">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
            <p className="text-muted-foreground">
              Gerenciar suas configurações de conta e preferências
            </p>
          </div>
        </AnimatedElement>

        <AnimatedElement type="fade" delay={0.2}>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="team">Equipe</TabsTrigger>
              <TabsTrigger value="ai">Configurações de IA</TabsTrigger>
              <TabsTrigger value="api">Chaves de API</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações Gerais</CardTitle>
                  <CardDescription>
                    Configure as configurações básicas da sua conta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Nome da Empresa</Label>
                      <Input id="company-name" placeholder="Nome da sua empresa" defaultValue="Vortex Technologies" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" placeholder="https://suaempresa.com" defaultValue="https://vortextech.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição da Empresa</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Breve descrição da sua empresa" 
                      defaultValue="A Vortex Technologies fornece soluções SaaS empresariais para otimizar operações de sucesso do cliente."
                    />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Fuso Horário</Label>
                      <Select defaultValue="utc-3">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o fuso horário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc-3">Horário de Brasília (UTC-3)</SelectItem>
                          <SelectItem value="utc-5">Horário do Leste (UTC-5)</SelectItem>
                          <SelectItem value="utc+0">UTC</SelectItem>
                          <SelectItem value="utc+1">Horário da Europa Central (UTC+1)</SelectItem>
                          <SelectItem value="utc+8">Horário Padrão da China (UTC+8)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma</Label>
                      <Select defaultValue="pt-BR">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                          <SelectItem value="en">Inglês</SelectItem>
                          <SelectItem value="es">Espanhol</SelectItem>
                          <SelectItem value="fr">Francês</SelectItem>
                          <SelectItem value="de">Alemão</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      {saved ? "Salvo!" : "Salvar Alterações"}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preferências de Notificação</CardTitle>
                  <CardDescription>
                    Configure como e quando você recebe notificações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Notificações por Email</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber notificações via email
                        </p>
                      </div>
                      <NotificationToggle defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Alertas de Atividade do Cliente</Label>
                        <p className="text-sm text-muted-foreground">
                          Seja notificado quando os clientes tomam ações importantes
                        </p>
                      </div>
                      <NotificationToggle defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Notificações de Insights de IA</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba alertas quando a IA detectar padrões importantes
                        </p>
                      </div>
                      <NotificationToggle defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Relatórios Semanais</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba relatórios resumidos semanais por email
                        </p>
                      </div>
                      <NotificationToggle />
                    </div>
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={handleSave}>
                      <Bell className="h-4 w-4 mr-2" />
                      {saved ? "Salvo!" : "Salvar Preferências"}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciamento de Equipe</CardTitle>
                  <CardDescription>
                    Gerencie membros da equipe e permissões
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Membros da Equipe</h3>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline">
                          <UserCog className="h-4 w-4 mr-2" />
                          Convidar Membro
                        </Button>
                      </motion.div>
                    </div>
                    
                    <div className="space-y-3">
                      <TeamMemberCard
                        name="João Silva"
                        email="joao@vortextech.com"
                        role="Administrador"
                      />
                      <TeamMemberCard
                        name="Sara Johnson"
                        email="sara@vortextech.com"
                        role="Gerente de Sucesso do Cliente"
                      />
                      <TeamMemberCard
                        name="Michael Chen"
                        email="michael@vortextech.com"
                        role="Gerente de Sucesso do Cliente"
                      />
                      <TeamMemberCard
                        name="Emily Davis"
                        email="emily@vortextech.com"
                        role="Especialista de Suporte"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configuração de IA</CardTitle>
                  <CardDescription>
                    Configure o comportamento da IA e as configurações de automação
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Automação de Respostas por IA</Label>
                        <p className="text-sm text-muted-foreground">
                          Permitir que a IA responda automaticamente a perguntas comuns dos clientes
                        </p>
                      </div>
                      <NotificationToggle defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Geração de Insights com IA</Label>
                        <p className="text-sm text-muted-foreground">
                          Habilitar a IA para analisar dados do cliente e gerar insights
                        </p>
                      </div>
                      <NotificationToggle defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Detecção Proativa de Riscos</Label>
                        <p className="text-sm text-muted-foreground">
                          Permitir que a IA identifique proativamente potenciais riscos do cliente
                        </p>
                      </div>
                      <NotificationToggle defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ai-model">Modelo de IA</Label>
                    <Select defaultValue="gpt4">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o modelo de IA" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt4">GPT-4 (Recomendado)</SelectItem>
                        <SelectItem value="gpt35">GPT-3.5</SelectItem>
                        <SelectItem value="custom">Modelo Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={handleSave}>
                      <Bot className="h-4 w-4 mr-2" />
                      {saved ? "Salvo!" : "Salvar Configurações de IA"}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Chaves de API</CardTitle>
                  <CardDescription>
                    Gerencie chaves de API para integrações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Chave de API de Produção</Label>
                    <div className="flex">
                      <Input
                        readOnly
                        value="sk_live_•••••••••••••••••••••••••••••"
                        className="font-mono text-sm"
                      />
                      <Button variant="outline" className="ml-2">
                        Copiar
                      </Button>
                      <Button variant="outline" className="ml-2">
                        Regenerar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Chave de API de Teste</Label>
                    <div className="flex">
                      <Input
                        readOnly
                        value="sk_test_•••••••••••••••••••••••••••••"
                        className="font-mono text-sm"
                      />
                      <Button variant="outline" className="ml-2">
                        Copiar
                      </Button>
                      <Button variant="outline" className="ml-2">
                        Regenerar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-sm font-medium mb-3">Integrações Ativas</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>Integração com Slack</span>
                        </div>
                        <Badge variant="outline">Conectado</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4" />
                          <span>Integração com Zendesk</span>
                        </div>
                        <Badge variant="outline">Conectado</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </AnimatedElement>
      </div>
    </PageTransition>
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
        {enabled ? "Ativado" : "Desativado"}
      </span>
    </div>
  );
}

function TeamMemberCard({ name, email, role }: { name: string; email: string; role: string }) {
  return (
    <motion.div 
      className="flex justify-between items-center p-3 border rounded-md"
      whileHover={{ 
        scale: 1.01,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
      }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div>
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="secondary">{role}</Badge>
        <Button variant="ghost" size="icon">
          <UserCog className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
      </div>
    </motion.div>
  );
} 