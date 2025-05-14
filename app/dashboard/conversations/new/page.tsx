"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedElement } from "@/components/ui/animated-element";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useUser } from "@clerk/nextjs";
import { ChevronLeft, Loader2, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Importações dos dados mockados
import { 
  mockCustomers, 
  createMockConversation 
} from "@/lib/mock-data";

export default function NewConversationPage() {
  const router = useRouter();
  const { user } = useUser();

  // Estado do formulário
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [isAIAssisted, setIsAIAssisted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Projetos disponíveis para o cliente selecionado
  const [availableProjects, setAvailableProjects] = useState<Array<{id: string; name: string}>>([]);
  
  // Atualizar projetos disponíveis quando o cliente mudar
  useEffect(() => {
    if (selectedCustomer) {
      const customer = mockCustomers.find(c => c.id === selectedCustomer);
      if (customer) {
        const projects = customer.projects.map(p => ({
          id: p.id,
          name: p.name
        }));
        setAvailableProjects(projects);
        // Limpar o projeto selecionado se não existir para este cliente
        if (projects.length === 0 || !projects.some(p => p.id === selectedProject)) {
          setSelectedProject("");
        }
      }
    } else {
      setAvailableProjects([]);
      setSelectedProject("");
    }
  }, [selectedCustomer, selectedProject]);

  // Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message || !selectedCustomer || !user) return;
    
    try {
      setIsSubmitting(true);
      
      // Encontrar o nome do cliente
      const customer = mockCustomers.find(c => c.id === selectedCustomer);
      if (!customer) {
        throw new Error("Cliente não encontrado");
      }
      
      // Criar conversa com dados mockados
      const conversationId = createMockConversation({
        title,
        customerName: customer.name,
        customerId: selectedCustomer,
        projectId: selectedProject || undefined,
        isAIAssisted,
        initialMessage: message,
        senderName: `${user.firstName} ${user.lastName}`,
        senderRole: "cs_agent",
      });
      
      // Simular um delay de rede
      setTimeout(() => {
        // Redirecionar para a conversa recém-criada
        router.push(`/dashboard/conversations/${conversationId}`);
      }, 800);
      
    } catch (error) {
      console.error("Erro ao criar conversa:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto">
        <AnimatedElement type="fade">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/conversations">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Nova Conversa</h1>
              <p className="text-muted-foreground">
                Inicie uma nova conversa com um cliente
              </p>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement type="fade" delay={0.1}>
          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Conversa</CardTitle>
              <CardDescription>
                Preencha as informações abaixo para iniciar uma nova conversa
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Suporte de Implementação"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer">Cliente</Label>
                  <Select
                    value={selectedCustomer}
                    onValueChange={setSelectedCustomer}
                    required
                  >
                    <SelectTrigger id="customer">
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCustomers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project">Projeto (Opcional)</Label>
                  <Select
                    value={selectedProject}
                    onValueChange={setSelectedProject}
                    disabled={availableProjects.length === 0}
                  >
                    <SelectTrigger id="project">
                      <SelectValue placeholder={
                        availableProjects.length === 0 
                          ? "Nenhum projeto disponível" 
                          : "Selecione um projeto (opcional)"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProjects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem Inicial</Label>
                  <Textarea
                    id="message"
                    placeholder="Digite a mensagem inicial para o cliente..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="ai-assisted"
                    checked={isAIAssisted}
                    onCheckedChange={setIsAIAssisted}
                  />
                  <Label htmlFor="ai-assisted">Assistido por IA</Label>
                  <span className="text-sm text-muted-foreground ml-1">
                    (O assistente de IA irá monitorar e responder a esta conversa)
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/conversations">Cancelar</Link>
                </Button>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        <span>Criando...</span>
                      </>
                    ) : (
                      <>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        <span>Iniciar Conversa</span>
                      </>
                    )}
                  </Button>
                </motion.div>
              </CardFooter>
            </form>
          </Card>
        </AnimatedElement>
      </div>
    </PageTransition>
  );
} 