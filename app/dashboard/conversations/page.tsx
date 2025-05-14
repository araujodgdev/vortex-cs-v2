"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MessageSquare, 
  Bot, 
  User, 
  Plus, 
  Loader2, 
  UserRound,
  Building,
  Calendar,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedElement } from "@/components/ui/animated-element";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

// Importação dos dados mockados
import { MockConversation, filterMockConversations } from "@/lib/mock-data";

export default function ConversationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<MockConversation[]>([]);
  const router = useRouter();
  
  // Simula carregamento e busca de dados
  useEffect(() => {
    // Simula uma operação de rede de 500ms
    const timer = setTimeout(() => {
      const filtered = filterMockConversations({
        status: activeTab === "all" ? undefined : activeTab === "open" ? "open" : activeTab === "closed" ? "closed" : undefined,
        isAIAssisted: activeTab === "ai-handled" ? true : undefined,
        searchQuery: searchQuery.length > 0 ? searchQuery : undefined,
      });
      
      setConversations(filtered);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [activeTab, searchQuery]);

  // Função para formatar a data relativa em português
  const formatRelativeDate = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), { 
      addSuffix: true,
      locale: ptBR
    });
  };

  return (
    <PageTransition>
      <div className="flex flex-col gap-5">
        <AnimatedElement type="fade">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Conversas</h1>
              <p className="text-muted-foreground">
                Gerencie conversas com clientes e tickets de suporte
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/dashboard/conversations/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Conversa
                </Button>
              </Link>
            </motion.div>
          </div>
        </AnimatedElement>

        <AnimatedElement type="fade" delay={0.2}>
          <div className="flex w-full items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar conversas..."
              className="flex-1"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setLoading(true); // Reativa o estado de carregamento ao mudar a busca
              }}
              type="search"
            />
          </div>
        </AnimatedElement>

        <AnimatedElement type="fade" delay={0.3}>
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => {
              setActiveTab(value);
              setLoading(true); // Reativa o estado de carregamento ao mudar a aba
            }} 
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="open">Abertas</TabsTrigger>
              <TabsTrigger value="ai-handled">Gerenciadas por IA</TabsTrigger>
              <TabsTrigger value="closed">Fechadas</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-4">
              {loading ? (
                // Loading state
                <ConversationsLoadingState />
              ) : conversations.length > 0 ? (
                // Conversations list
                conversations.map((conversation, index) => (
                  <motion.div 
                    key={conversation._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <Link href={`/dashboard/conversations/${conversation._id}`}>
                      <ConversationCard 
                        conversation={conversation} 
                        formatRelativeDate={formatRelativeDate}
                      />
                    </Link>
                  </motion.div>
                ))
              ) : (
                // Empty state
                <EmptyState 
                  message={
                    searchQuery.length > 0 
                      ? "Nenhuma conversa encontrada para essa busca." 
                      : activeTab === "all" 
                        ? "Nenhuma conversa disponível."
                        : activeTab === "open"
                          ? "Nenhuma conversa aberta."
                          : activeTab === "ai-handled"
                            ? "Nenhuma conversa gerenciada por IA."
                            : "Nenhuma conversa fechada."
                  } 
                />
              )}
            </TabsContent>
          </Tabs>
        </AnimatedElement>
      </div>
    </PageTransition>
  );
}

function ConversationCard({ 
  conversation, 
  formatRelativeDate 
}: { 
  conversation: MockConversation,
  formatRelativeDate: (timestamp: number) => string
}) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Card className={conversation.unreadMessages > 0 ? "border-primary/50" : ""}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">
                  {conversation.title}
                </CardTitle>
                {conversation.unreadMessages > 0 && (
                  <Badge variant="default" className="text-xs">
                    {conversation.unreadMessages} {conversation.unreadMessages === 1 ? "nova" : "novas"}
                  </Badge>
                )}
              </div>
              <CardDescription>
                <div className="flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  <span>{conversation.customerName}</span>
                </div>
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatRelativeDate(conversation.lastMessageAt)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <Badge variant={conversation.status === "open" ? "outline" : "secondary"}>
              {conversation.status === "open" ? "Aberto" : "Fechado"}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {conversation.isAIAssisted ? (
                <>
                  <Bot className="h-3 w-3" />
                  <span>Assistido por IA</span>
                </>
              ) : conversation.assignee ? (
                <>
                  <UserRound className="h-3 w-3" />
                  <span>{conversation.assignee}</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-3 w-3" />
                  <span>Não atribuído</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Estado de carregamento para a lista de conversas
function ConversationsLoadingState() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
      </motion.div>
      <h3 className="text-lg font-medium">{message}</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Conversas aparecerão aqui quando forem criadas.
      </p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6"
      >
        <Link href="/dashboard/conversations/new">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Iniciar uma conversa
          </Button>
        </Link>
      </motion.div>
    </div>
  );
} 