"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedElement } from "@/components/ui/animated-element";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, ArrowUpRight, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="flex flex-col gap-5">
        <AnimatedElement type="fade">
          <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
          <p className="text-muted-foreground">
            Gerencie e acompanhe todos os projetos de customer success.
          </p>
        </AnimatedElement>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar projetos..." 
                className="max-w-sm pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        {/* Overview Cards */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnimatedElement type="scale" delay={0.1}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48</div>
                <p className="text-xs text-muted-foreground">
                  +3 novos este mês
                </p>
              </CardContent>
            </Card>
          </AnimatedElement>

          <AnimatedElement type="scale" delay={0.2}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
                <Clock className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">
                  5 com atualizações recentes
                </p>
              </CardContent>
            </Card>
          </AnimatedElement>

          <AnimatedElement type="scale" delay={0.3}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
                <CheckCircle className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">16</div>
                <p className="text-xs text-muted-foreground">
                  +2 na última semana
                </p>
              </CardContent>
            </Card>
          </AnimatedElement>

          <AnimatedElement type="scale" delay={0.4}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">
                  +5% em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
          </AnimatedElement>
        </section>

        {/* Projects List */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Projetos Recentes</h2>
          <div className="grid gap-4">
            {[
              {
                name: "Implementação CRM",
                client: "TechCorp Solutions",
                status: "Em Andamento",
                progress: 75,
                lastUpdate: "Há 2 horas",
              },
              {
                name: "Migração de Dados",
                client: "Global Systems Inc",
                status: "Planejamento",
                progress: 25,
                lastUpdate: "Há 1 dia",
              },
              {
                name: "Treinamento de Equipe",
                client: "Innovate Ltd",
                status: "Concluído",
                progress: 100,
                lastUpdate: "Há 3 dias",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group"
              >
                <Card className="transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                      <Badge 
                        variant={
                          project.status === "Concluído" ? "default" :
                          project.status === "Em Andamento" ? "secondary" :
                          "outline"
                        }
                        className={
                          project.status === "Concluído" ? "bg-primary text-primary-foreground" :
                          project.status === "Em Andamento" ? "bg-primary/10 text-primary" :
                          ""
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Última atualização: {project.lastUpdate}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}