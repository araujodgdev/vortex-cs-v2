"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedElement } from "@/components/ui/animated-element";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  ChevronLeft, 
  Send, 
  Paperclip, 
  Bot, 
  User as UserIcon, 
  Building2, 
  Clock, 
  Check,
  X,
  UserRound,
  RefreshCw,
  AlertCircle,
  Download
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

// Importações dos dados mockados
import {
  mockConversations,
  mockMessages,
  mockAttachments,
  MockConversation,
  MockMessage,
  MockAttachment,
  getMockMessages,
  getMockAttachment,
  addMockMessage,
  markMockMessagesAsRead,
  updateMockConversationStatus,
  assignMockConversation
} from "@/lib/mock-data";

export default function ConversationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useUser();
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState<MockConversation | null>(null);
  const [messages, setMessages] = useState<MockMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Carregar dados da conversa
  useEffect(() => {
    // Simula uma operação de rede de 500ms
    const timer = setTimeout(() => {
      const foundConversation = mockConversations.find(c => c._id === id);
      if (foundConversation) {
        setConversation(foundConversation);
        setMessages(getMockMessages(id as string));
        
        // Marcar mensagens como lidas
        if (foundConversation.unreadMessages > 0) {
          markMockMessagesAsRead(id as string);
          // Atualiza o estado local também
          foundConversation.unreadMessages = 0;
        }
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  // Rolar para o final da conversa quando novas mensagens chegarem
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Enviar nova mensagem
  const handleSendMessage = () => {
    if (!newMessage.trim() || !user || !conversation) return;
    
    const now = Date.now();
    addMockMessage({
      conversationId: id as string,
      content: newMessage,
      sender: user.id,
      senderName: `${user.firstName} ${user.lastName}`,
      senderRole: "cs_agent",
      createdAt: now,
      read: false,
    });
    
    // Atualizar a interface
    setMessages(prev => [
      ...prev, 
      {
        _id: `msg_temp_${Date.now()}`,
        conversationId: id as string,
        content: newMessage,
        sender: user.id,
        senderName: `${user.firstName} ${user.lastName}`,
        senderRole: "cs_agent",
        createdAt: now,
        read: false,
      }
    ]);
    
    setNewMessage("");
  };

  // Lidar com fechamento/reabertura de conversa
  const handleToggleStatus = () => {
    if (!conversation) return;
    
    const newStatus = conversation.status === "open" ? "closed" : "open";
    updateMockConversationStatus(id as string, newStatus);
    
    // Atualiza o estado local
    setConversation(prev => {
      if (!prev) return null;
      return { ...prev, status: newStatus as "open" | "closed", updatedAt: Date.now() };
    });
  };

  // Lidar com atribuição de conversa
  const handleAssign = (assignToAI: boolean) => {
    if (!conversation || !user) return;
    
    const assignee = assignToAI ? "AI" : `${user.firstName} ${user.lastName}`;
    assignMockConversation(id as string, assignee, assignToAI);
    
    // Atualiza o estado local
    setConversation(prev => {
      if (!prev) return null;
      return { 
        ...prev, 
        assignee, 
        isAIAssisted: assignToAI,
        updatedAt: Date.now() 
      };
    });
  };

  if (loading) {
    return <ConversationLoadingState />;
  }

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Conversa não encontrada</h2>
        <p className="text-muted-foreground mb-6">A conversa que você está procurando não existe ou foi removida.</p>
        <Link href="/dashboard/conversations">
          <Button>Voltar para Conversas</Button>
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        {/* Cabeçalho */}
        <AnimatedElement type="fade">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard/conversations">
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{conversation.title}</h1>
                <p className="text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  <span>{conversation.customerName}</span>
                  <span className="mx-1">•</span>
                  <Clock className="h-3 w-3" />
                  <span>
                    {format(new Date(conversation.createdAt), "PPP", { locale: ptBR })}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={conversation.status === "open" ? "outline" : "secondary"}>
                {conversation.status === "open" ? "Aberto" : "Fechado"}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleToggleStatus}
              >
                {conversation.status === "open" ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    <span>Fechar</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    <span>Reabrir</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </AnimatedElement>

        {/* Área de mensagens */}
        <AnimatedElement type="fade" delay={0.1}>
          <Card className="flex-1 overflow-hidden flex flex-col">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Mensagens</CardTitle>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground mr-1">Atribuído a:</span>
                  {conversation.isAIAssisted ? (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Bot className="h-3 w-3" />
                      <span>Assistente IA</span>
                    </Badge>
                  ) : conversation.assignee ? (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <UserRound className="h-3 w-3" />
                      <span>{conversation.assignee}</span>
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>Não atribuído</span>
                    </Badge>
                  )}
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleAssign(false)}
                      disabled={conversation.assignee === user?.firstName + " " + user?.lastName}
                    >
                      <UserRound className="h-3 w-3 mr-1" />
                      <span>Atribuir a mim</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleAssign(true)}
                      disabled={conversation.isAIAssisted}
                    >
                      <Bot className="h-3 w-3 mr-1" />
                      <span>Atribuir à IA</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    className={`flex ${message.senderRole === "cs_agent" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-2 max-w-[80%] ${message.senderRole === "cs_agent" ? "flex-row-reverse" : ""}`}>
                      <Avatar className="h-8 w-8">
                        {message.senderRole === "ai" ? (
                          <Bot className="h-5 w-5" />
                        ) : message.senderRole === "cs_agent" ? (
                          <UserRound className="h-5 w-5" />
                        ) : (
                          <Building2 className="h-5 w-5" />
                        )}
                        <AvatarFallback>
                          {message.senderName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className={`rounded-lg p-3 ${
                          message.senderRole === "cs_agent"
                            ? "bg-primary text-primary-foreground"
                            : message.senderRole === "ai"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted"
                        }`}>
                          <p>{message.content}</p>
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {message.attachments.map((attachmentId) => (
                                <AttachmentItem key={attachmentId} attachmentId={attachmentId} />
                              ))}
                            </div>
                          )}
                        </div>
                        <div className={`text-xs text-muted-foreground mt-1 flex items-center gap-1 ${
                          message.senderRole === "cs_agent" ? "justify-end" : ""
                        }`}>
                          <span>{message.senderName}</span>
                          <span>•</span>
                          <span>{format(new Date(message.createdAt), "HH:mm", { locale: ptBR })}</span>
                          {message.read && <Check className="h-3 w-3 ml-1" />}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </CardContent>
            <CardFooter className="border-t p-3">
              {conversation.status === "open" ? (
                <div className="flex w-full items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar
                  </Button>
                </div>
              ) : (
                <div className="w-full py-2 flex justify-center">
                  <p className="text-muted-foreground text-sm">
                    Esta conversa está fechada.
                    <Button variant="link" onClick={handleToggleStatus} className="h-auto p-0 ml-1">
                      Reabrir conversa
                    </Button>
                  </p>
                </div>
              )}
            </CardFooter>
          </Card>
        </AnimatedElement>
      </div>
    </PageTransition>
  );
}

// Componente para exibir um anexo
function AttachmentItem({ attachmentId }: { attachmentId: string }) {
  const [attachment, setAttachment] = useState<MockAttachment | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const foundAttachment = getMockAttachment(attachmentId);
      setAttachment(foundAttachment || null);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [attachmentId]);

  if (loading) {
    return (
      <div className="bg-background/50 rounded p-2 flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }
  
  if (!attachment) {
    return (
      <div className="bg-background/50 rounded p-2 flex items-center gap-2 text-muted-foreground">
        <AlertCircle className="h-4 w-4" />
        <span className="text-sm">Anexo não encontrado</span>
      </div>
    );
  }

  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-background/50 rounded p-2 flex items-center gap-2 hover:bg-background transition-colors"
    >
      <Download className="h-4 w-4" />
      <span className="text-sm truncate">{attachment.fileName}</span>
    </a>
  );
}

// Estado de carregamento para a página de conversa
function ConversationLoadingState() {
  return (
    <PageTransition>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-md" />
            <div>
              <Skeleton className="h-8 w-60 mb-1" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>

        <Card className="flex-1 overflow-hidden flex flex-col">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-2 max-w-[80%] ${i % 2 === 0 ? "flex-row-reverse" : ""}`}>
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div>
                    <Skeleton className="h-24 w-64 rounded-lg" />
                    <div className={`mt-1 flex ${i % 2 === 0 ? "justify-end" : ""}`}>
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="border-t p-3">
            <div className="flex w-full items-center gap-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="flex-1 h-10" />
              <Skeleton className="h-10 w-24" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </PageTransition>
  );
} 