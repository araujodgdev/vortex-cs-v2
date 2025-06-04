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
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <PageTransition>
      <div className="flex flex-col gap-5">
        <AnimatedElement type="fade">
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas preferências e configurações da plataforma.
          </p>
        </AnimatedElement>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              API
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais e preferências.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Seu nome" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Conte um pouco sobre você" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Cargo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs-manager">Gerente de CS</SelectItem>
                      <SelectItem value="cs-analyst">Analista de CS</SelectItem>
                      <SelectItem value="cs-specialist">Especialista de CS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>
                  Configure como e quando deseja receber notificações.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    {
                      title: "Mensagens",
                      description: "Quando receber novas mensagens de clientes",
                      icon: <MessageSquare className="h-4 w-4" />,
                    },
                    {
                      title: "Insights de IA",
                      description: "Quando a IA detectar padrões importantes",
                      icon: <Bot className="h-4 w-4" />,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 rounded-lg border border-border p-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as notificações</SelectItem>
                          <SelectItem value="important">Apenas importantes</SelectItem>
                          <SelectItem value="none">Nenhuma</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Preferências
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Chaves de API</CardTitle>
                <CardDescription>
                  Gerencie suas chaves de API para integração com outros sistemas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <h4 className="text-sm font-medium">Chave de Produção</h4>
                      <p className="text-sm text-muted-foreground">
                        Última atualização: 2 dias atrás
                      </p>
                    </div>
                    <Badge variant="outline">Ativa</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <h4 className="text-sm font-medium">Chave de Desenvolvimento</h4>
                      <p className="text-sm text-muted-foreground">
                        Última atualização: 5 dias atrás
                      </p>
                    </div>
                    <Badge variant="outline">Ativa</Badge>
                  </div>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Gerar Nova Chave
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
} 