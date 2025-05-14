"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart3, Calendar, FileText, MessageSquare, Phone, Mail, Building, Users, Star, AlertTriangle, CheckCircle, RefreshCcw, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedElement } from "@/components/ui/animated-element";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Tipos para os dados mockados
interface Customer {
  id: string;
  name: string;
  segment: string;
  status: "Ativo" | "Em risco" | "Inativo";
  email: string;
  phone: string;
  address: string;
  churnScore: number;
  startDate: string;
  industry: string;
  contacts: Contact[];
  projects: Project[];
  feedback: Feedback[];
  activities: Activity[];
  assessments: Assessment[];
}

interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

interface Project {
  id: string;
  name: string;
  status: "Em andamento" | "Concluído" | "Atrasado";
  progress: number;
  startDate: string;
  endDate: string;
}

interface Feedback {
  id: string;
  type: "Elogio" | "Sugestão" | "Problema";
  content: string;
  date: string;
  status: "Pendente" | "Em análise" | "Resolvido";
}

interface Activity {
  id: string;
  type: "Reunião" | "Email" | "Ligação" | "Nota";
  description: string;
  date: string;
  user: string;
}

interface Assessment {
  id: string;
  type: "NPS" | "CSAT" | "MHS";
  score: number;
  date: string;
  feedback: string;
}

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.id;
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // Simulação de carregamento de dados
    const timer = setTimeout(() => {
      // Dados mockados do cliente
      const mockCustomer: Customer = {
        id: customerId as string,
        name: "Empresa ABC Tecnologia",
        segment: "Enterprise",
        status: "Ativo",
        email: "contato@abctech.com.br",
        phone: "(11) 3456-7890",
        address: "Av. Paulista, 1000, São Paulo, SP",
        churnScore: 15,
        startDate: "10/03/2022",
        industry: "Tecnologia",
        contacts: [
          {
            id: "c1",
            name: "Maria Silva",
            role: "Diretora de Tecnologia",
            email: "maria.silva@abctech.com.br",
            phone: "(11) 98765-4321",
            isPrimary: true,
          },
          {
            id: "c2",
            name: "João Santos",
            role: "Gerente de Projetos",
            email: "joao.santos@abctech.com.br",
            phone: "(11) 91234-5678",
            isPrimary: false,
          },
          {
            id: "c3",
            name: "Ana Oliveira",
            role: "Coordenadora de Sucesso do Cliente",
            email: "ana.oliveira@abctech.com.br",
            phone: "(11) 99876-5432",
            isPrimary: false,
          },
        ],
        projects: [
          {
            id: "p1",
            name: "Implementação ERP",
            status: "Em andamento",
            progress: 65,
            startDate: "15/04/2022",
            endDate: "30/11/2023",
          },
          {
            id: "p2",
            name: "Migração de Dados",
            status: "Concluído",
            progress: 100,
            startDate: "10/01/2023",
            endDate: "28/02/2023",
          },
          {
            id: "p3",
            name: "Desenvolvimento Portal",
            status: "Atrasado",
            progress: 40,
            startDate: "05/05/2023",
            endDate: "15/10/2023",
          },
        ],
        feedback: [
          {
            id: "f1",
            type: "Elogio",
            content: "A equipe de suporte tem sido extremamente atenciosa e eficiente em resolver nossos problemas.",
            date: "15/09/2023",
            status: "Resolvido",
          },
          {
            id: "f2",
            type: "Sugestão",
            content: "Seria útil ter mais opções de personalização nos relatórios gerados pelo sistema.",
            date: "02/10/2023",
            status: "Em análise",
          },
          {
            id: "f3",
            type: "Problema",
            content: "Estamos enfrentando lentidão no módulo de processamento de dados durante horários de pico.",
            date: "20/10/2023",
            status: "Pendente",
          },
        ],
        activities: [
          {
            id: "a1",
            type: "Reunião",
            description: "Reunião de acompanhamento trimestral com equipe de gestão",
            date: "25/10/2023",
            user: "Carlos Mendes",
          },
          {
            id: "a2",
            type: "Email",
            description: "Enviado material sobre novas funcionalidades lançadas",
            date: "20/10/2023",
            user: "Juliana Costa",
          },
          {
            id: "a3",
            type: "Ligação",
            description: "Chamada para resolver dúvidas sobre integração de API",
            date: "18/10/2023",
            user: "Fernando Santos",
          },
          {
            id: "a4",
            type: "Nota",
            description: "Cliente solicitou antecipação da entrega do módulo financeiro",
            date: "15/10/2023",
            user: "Mariana Lima",
          },
        ],
        assessments: [
          {
            id: "as1",
            type: "NPS",
            score: 8,
            date: "30/09/2023",
            feedback: "Estamos satisfeitos com o serviço, mas ainda existem alguns pontos a melhorar na usabilidade."
          },
          {
            id: "as2",
            type: "CSAT",
            score: 4.5,
            date: "15/08/2023",
            feedback: "O último atendimento foi rápido e eficiente."
          },
          {
            id: "as3",
            type: "MHS",
            score: 4.2,
            date: "30/07/2023",
            feedback: "A implementação foi relativamente tranquila, porém o treinamento poderia ser mais detalhado."
          },
        ],
      };

      setCustomer(mockCustomer);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [customerId]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
        <span className="sr-only">Carregando...</span>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-bold">Cliente não encontrado</h2>
        <p className="text-muted-foreground mt-1">
          O cliente solicitado não foi encontrado no sistema.
        </p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/customers">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Lista de Clientes
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="flex flex-col gap-6">
        <AnimatedElement type="fade">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard/customers">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{customer.industry}</span>
                  <span>•</span>
                  <span>{customer.segment}</span>
                  <span>•</span>
                  <span>Cliente desde {customer.startDate}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <StatusBadge status={customer.status} />
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Nova Atividade
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Registrar Nova Atividade</DialogTitle>
                    <DialogDescription>
                      Adicione uma nova atividade ou interação com este cliente.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-center text-muted-foreground">
                      Formulário de nova atividade seria implementado aqui
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedElement type="fade" delay={0.1}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{customer.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">Indicador de Risco de Churn</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          customer.churnScore < 30 
                            ? "bg-green-500" 
                            : customer.churnScore < 70 
                              ? "bg-yellow-500" 
                              : "bg-red-500"
                        }`}
                        style={{ width: `${customer.churnScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{customer.churnScore}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {customer.churnScore < 30 
                      ? "Baixo risco de churn" 
                      : customer.churnScore < 70 
                        ? "Risco moderado de churn" 
                        : "Alto risco de churn"
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>

          <AnimatedElement type="fade" delay={0.2} className="col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Visão Geral das Avaliações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {customer.assessments.map((assessment) => (
                    <motion.div 
                      key={assessment.id}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{assessment.type}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-bold">
                            {assessment.type === "NPS" 
                              ? assessment.score 
                              : assessment.score.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{assessment.date}</p>
                      <p className="text-sm mt-2 line-clamp-2">{assessment.feedback}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>
        </div>

        <AnimatedElement type="fade" delay={0.3}>
          <Tabs defaultValue="contacts" className="space-y-4">
            <TabsList>
              <TabsTrigger value="contacts">Contatos</TabsTrigger>
              <TabsTrigger value="projects">Projetos</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="activities">Atividades</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contacts" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Contatos do Cliente</CardTitle>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Adicionar Contato
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customer.contacts.map((contact) => (
                      <motion.div 
                        key={contact.id}
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                        className="flex justify-between items-center p-3 rounded-lg border"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{contact.name}</h3>
                            {contact.isPrimary && (
                              <Badge variant="outline">Principal</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{contact.role}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-sm">{contact.email}</p>
                          <p className="text-sm text-muted-foreground">{contact.phone}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="projects" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Projetos</CardTitle>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Novo Projeto
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customer.projects.map((project) => (
                      <motion.div 
                        key={project.id}
                        whileHover={{ y: -3 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="p-4 border rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold">{project.name}</h3>
                          <StatusBadge status={project.status} />
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progresso</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                project.status === "Concluído" 
                                  ? "bg-green-500" 
                                  : project.status === "Atrasado" 
                                    ? "bg-red-500" 
                                    : "bg-blue-500"
                              }`}
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground flex justify-between">
                          <span>Início: {project.startDate}</span>
                          <span>Término: {project.endDate}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="feedback" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Feedback do Cliente</CardTitle>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Registrar Feedback
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customer.feedback.map((item) => (
                      <motion.div 
                        key={item.id}
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                        className="p-4 border rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <Badge 
                            variant={item.type === "Elogio" ? "outline" : item.type === "Sugestão" ? "secondary" : "destructive"}
                          >
                            {item.type}
                          </Badge>
                          <Badge 
                            variant={
                              item.status === "Resolvido" 
                                ? "outline" 
                                : item.status === "Em análise" 
                                  ? "secondary" 
                                  : "default"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{item.content}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activities" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Histórico de Atividades</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Atualizar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customer.activities.map((activity, index) => (
                      <motion.div 
                        key={activity.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex gap-4 p-3 border-b last:border-0"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          {activity.type === "Reunião" && <Calendar className="h-5 w-5" />}
                          {activity.type === "Email" && <Mail className="h-5 w-5" />}
                          {activity.type === "Ligação" && <Phone className="h-5 w-5" />}
                          {activity.type === "Nota" && <FileText className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{activity.type}</p>
                            <p className="text-sm text-muted-foreground">{activity.date}</p>
                          </div>
                          <p className="text-sm mt-1">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">por {activity.user}</p>
                        </div>
                      </motion.div>
                    ))}
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

// Componente auxiliar para renderizar badges de status
function StatusBadge({ status }: { status: string }) {
  let variant: "outline" | "destructive" | "default" | "secondary" = "default";
  let icon = null;
  
  switch (status) {
    case "Ativo":
      variant = "outline";
      icon = <CheckCircle className="h-3 w-3 mr-1" />;
      break;
    case "Em risco":
      variant = "secondary";
      icon = <AlertTriangle className="h-3 w-3 mr-1" />;
      break;
    case "Inativo":
      variant = "destructive";
      icon = <Clock className="h-3 w-3 mr-1" />;
      break;
    case "Em andamento":
      variant = "default";
      icon = <Clock className="h-3 w-3 mr-1" />;
      break;
    case "Concluído":
      variant = "outline";
      icon = <CheckCircle className="h-3 w-3 mr-1" />;
      break;
    case "Atrasado":
      variant = "destructive";
      icon = <AlertTriangle className="h-3 w-3 mr-1" />;
      break;
  }

  return (
    <Badge variant={variant} className="flex items-center">
      {icon}
      {status}
    </Badge>
  );
} 