export interface MockConversation {
  _id: string;
  title: string;
  customerName: string;
  customerId: string;
  projectId?: string;
  status: "open" | "closed";
  assignee?: string;
  isAIAssisted: boolean;
  createdAt: number;
  updatedAt: number;
  lastMessageAt: number;
  unreadMessages: number;
}

export interface MockMessage {
  _id: string;
  conversationId: string;
  content: string;
  sender: string;
  senderName: string;
  senderRole: "customer" | "cs_agent" | "ai";
  createdAt: number;
  read: boolean;
  attachments?: string[];
}

export interface MockAttachment {
  _id: string;
  fileName: string;
  fileId: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  conversationId?: string;
  messageId?: string;
  createdAt: number;
  url: string;
}

export interface MockCustomer {
  id: string;
  name: string;
  email: string;
  company: string;
  projects: MockProject[];
}

export interface MockProject {
  id: string;
  name: string;
  status: "active" | "completed" | "on-hold";
  startDate: number;
}

// Dados mockados para conversas
export const mockConversations: MockConversation[] = [
  {
    _id: "1",
    title: "Suporte de Implementação",
    customerName: "Acme Inc",
    customerId: "cust_1",
    projectId: "proj_1",
    status: "open",
    assignee: "Sarah Johnson",
    isAIAssisted: false,
    createdAt: Date.now() - 86400000 * 2, // 2 dias atrás
    updatedAt: Date.now() - 3600000, // 1 hora atrás
    lastMessageAt: Date.now() - 3600000,
    unreadMessages: 2,
  },
  {
    _id: "2",
    title: "Solicitação de Recurso",
    customerName: "TechGiant",
    customerId: "cust_2",
    projectId: "proj_2",
    status: "open",
    assignee: undefined,
    isAIAssisted: true,
    createdAt: Date.now() - 86400000 * 3, // 3 dias atrás
    updatedAt: Date.now() - 43200000, // 12 horas atrás
    lastMessageAt: Date.now() - 43200000,
    unreadMessages: 0,
  },
  {
    _id: "3",
    title: "Dúvida de Faturamento",
    customerName: "Innovate Co",
    customerId: "cust_3",
    status: "closed",
    assignee: "AI",
    isAIAssisted: true,
    createdAt: Date.now() - 86400000 * 10, // 10 dias atrás
    updatedAt: Date.now() - 86400000 * 5, // 5 dias atrás
    lastMessageAt: Date.now() - 86400000 * 5,
    unreadMessages: 0,
  },
  {
    _id: "4",
    title: "Solicitação de Chamada de Onboarding",
    customerName: "Global Services",
    customerId: "cust_4",
    projectId: "proj_3",
    status: "open",
    assignee: "Michael Chen",
    isAIAssisted: false,
    createdAt: Date.now() - 86400000 * 4, // 4 dias atrás
    updatedAt: Date.now() - 86400000, // 1 dia atrás
    lastMessageAt: Date.now() - 86400000,
    unreadMessages: 0,
  },
  {
    _id: "5",
    title: "Feedback do Produto",
    customerName: "Future Tech",
    customerId: "cust_5",
    projectId: "proj_4",
    status: "closed",
    assignee: "AI",
    isAIAssisted: true,
    createdAt: Date.now() - 86400000 * 15, // 15 dias atrás
    updatedAt: Date.now() - 86400000 * 7, // 7 dias atrás
    lastMessageAt: Date.now() - 86400000 * 7,
    unreadMessages: 0,
  },
];

// Dados mockados para mensagens
export const mockMessages: Record<string, MockMessage[]> = {
  "1": [
    {
      _id: "msg_1_1",
      conversationId: "1",
      content: "Olá, estamos enfrentando problemas com a integração da API. O endpoint /users não está retornando os dados conforme esperado.",
      sender: "usr_customer",
      senderName: "João Silva (Acme Inc)",
      senderRole: "customer",
      createdAt: Date.now() - 86400000 * 2, // 2 dias atrás
      read: true,
      attachments: ["att_1"],
    },
    {
      _id: "msg_1_2",
      conversationId: "1",
      content: "Olá João, obrigada pelo contato! Vou verificar imediatamente o que está acontecendo com o endpoint. Pode me fornecer o log de erro que está recebendo?",
      sender: "usr_agent",
      senderName: "Sarah Johnson",
      senderRole: "cs_agent",
      createdAt: Date.now() - 86400000 * 2 + 3600000, // 2 dias atrás + 1 hora
      read: true,
    },
    {
      _id: "msg_1_3",
      conversationId: "1",
      content: "Claro, segue anexo o log de erro. Estamos recebendo um erro 403 ao tentar acessar.",
      sender: "usr_customer",
      senderName: "João Silva (Acme Inc)",
      senderRole: "customer",
      createdAt: Date.now() - 86400000 + 7200000, // 1 dia atrás + 2 horas
      read: true,
      attachments: ["att_2"],
    },
    {
      _id: "msg_1_4",
      conversationId: "1",
      content: "Analisei o log e identifiquei o problema. Parece que há uma configuração de permissão incorreta. Vou corrigir isso agora mesmo e lhe aviso quando estiver pronto.",
      sender: "usr_agent",
      senderName: "Sarah Johnson",
      senderRole: "cs_agent",
      createdAt: Date.now() - 86400000 + 10800000, // 1 dia atrás + 3 horas
      read: true,
    },
    {
      _id: "msg_1_5",
      conversationId: "1",
      content: "João, o problema foi corrigido! Atualizamos as permissões e o endpoint /users agora deve estar funcionando corretamente. Por favor, teste e me avise se ainda enfrentar algum problema.",
      sender: "usr_agent",
      senderName: "Sarah Johnson",
      senderRole: "cs_agent",
      createdAt: Date.now() - 3600000 * 2, // 2 horas atrás
      read: false,
    },
    {
      _id: "msg_1_6",
      conversationId: "1",
      content: "Ótimo! Agora está funcionando perfeitamente. Muito obrigado pela ajuda rápida.",
      sender: "usr_customer",
      senderName: "João Silva (Acme Inc)",
      senderRole: "customer",
      createdAt: Date.now() - 3600000, // 1 hora atrás
      read: false,
    },
  ],
  "2": [
    {
      _id: "msg_2_1",
      conversationId: "2",
      content: "Olá! Gostaríamos de saber se é possível adicionar relatórios personalizados ao dashboard. Precisamos de um relatório específico para métricas de engajamento.",
      sender: "usr_customer",
      senderName: "Ana Costa (TechGiant)",
      senderRole: "customer",
      createdAt: Date.now() - 86400000 * 3, // 3 dias atrás
      read: true,
    },
    {
      _id: "msg_2_2",
      conversationId: "2",
      content: "Olá Ana! Sou o Assistente IA da plataforma. Sim, é possível adicionar relatórios personalizados ao dashboard. Temos várias opções disponíveis. Poderia me detalhar exatamente quais métricas de engajamento você precisa monitorar?",
      sender: "ai",
      senderName: "Assistente IA",
      senderRole: "ai",
      createdAt: Date.now() - 86400000 * 3 + 1800000, // 3 dias atrás + 30 minutos
      read: true,
    },
    {
      _id: "msg_2_3",
      conversationId: "2",
      content: "Precisamos monitorar o tempo médio de uso da plataforma, número de acessos por usuário e taxa de conversão de funcionalidades.",
      sender: "usr_customer",
      senderName: "Ana Costa (TechGiant)",
      senderRole: "customer",
      createdAt: Date.now() - 86400000 * 2, // 2 dias atrás
      read: true,
    },
    {
      _id: "msg_2_4",
      conversationId: "2",
      content: "Perfeito! Analisei suas necessidades e posso confirmar que temos todas essas métricas disponíveis. Vou preparar uma proposta de dashboard personalizado para você. Enquanto isso, anexei um guia de relatórios que mostra algumas opções disponíveis.",
      sender: "ai",
      senderName: "Assistente IA",
      senderRole: "ai",
      createdAt: Date.now() - 43200000, // 12 horas atrás
      read: true,
      attachments: ["att_3"],
    },
  ],
  "3": [
    {
      _id: "msg_3_1",
      conversationId: "3",
      content: "Olá, notamos que nossa última fatura parece ter um erro no valor total. Conforme nosso contrato, o pacote contratado é o Business, mas estamos sendo cobrados pelo Premium.",
      sender: "usr_customer",
      senderName: "Roberto Oliveira (Innovate Co)",
      senderRole: "customer",
      createdAt: Date.now() - 86400000 * 10, // 10 dias atrás
      read: true,
    },
    {
      _id: "msg_3_2",
      conversationId: "3",
      content: "Olá Roberto, sou o Assistente IA e vou ajudá-lo com essa questão. Deixe-me verificar as informações da sua conta e a fatura em questão.",
      sender: "ai",
      senderName: "Assistente IA",
      senderRole: "ai",
      createdAt: Date.now() - 86400000 * 10 + 1800000, // 10 dias atrás + 30 minutos
      read: true,
    },
    {
      _id: "msg_3_3",
      conversationId: "3",
      content: "Verifiquei o sistema e você tem razão. Encontrei uma discrepância entre o plano contratado e o que foi cobrado. Vou solicitar a correção imediatamente e uma nova fatura será emitida nos próximos dias úteis. Pedimos desculpas pelo inconveniente.",
      sender: "ai",
      senderName: "Assistente IA",
      senderRole: "ai",
      createdAt: Date.now() - 86400000 * 10 + 7200000, // 10 dias atrás + 2 horas
      read: true,
    },
    {
      _id: "msg_3_4",
      conversationId: "3",
      content: "Obrigado pela verificação rápida! Aguardamos a nova fatura.",
      sender: "usr_customer",
      senderName: "Roberto Oliveira (Innovate Co)",
      senderRole: "customer",
      createdAt: Date.now() - 86400000 * 9, // 9 dias atrás
      read: true,
    },
    {
      _id: "msg_3_5",
      conversationId: "3",
      content: "Roberto, a nova fatura já foi emitida com o valor correto. Você deve recebê-la por e-mail em breve. Mais uma vez, pedimos desculpas pelo erro e agradecemos por trazê-lo à nossa atenção.",
      sender: "ai",
      senderName: "Assistente IA",
      senderRole: "ai",
      createdAt: Date.now() - 86400000 * 5, // 5 dias atrás
      read: true,
    },
  ],
  "4": [
    {
      _id: "msg_4_1",
      conversationId: "4",
      content: "Olá, gostaríamos de agendar uma chamada de onboarding para nossos novos membros da equipe que começarão a utilizar a plataforma na próxima semana.",
      sender: "usr_customer",
      senderName: "Cláudia Mendes (Global Services)",
      senderRole: "customer",
      createdAt: Date.now() - 86400000 * 4, // 4 dias atrás
      read: true,
    },
    {
      _id: "msg_4_2",
      conversationId: "4",
      content: "Olá Cláudia! Claro, podemos agendar uma chamada de onboarding. Quais datas e horários seriam mais convenientes para vocês?",
      sender: "usr_agent",
      senderName: "Michael Chen",
      senderRole: "cs_agent",
      createdAt: Date.now() - 86400000 * 4 + 3600000, // 4 dias atrás + 1 hora
      read: true,
    },
    {
      _id: "msg_4_3",
      conversationId: "4",
      content: "Seria possível na próxima terça-feira, às 14h? Teremos 5 novos integrantes que precisam ser treinados.",
      sender: "usr_customer",
      senderName: "Cláudia Mendes (Global Services)",
      senderRole: "customer",
      createdAt: Date.now() - 86400000 * 3, // 3 dias atrás
      read: true,
    },
    {
      _id: "msg_4_4",
      conversationId: "4",
      content: "Perfeito, Cláudia. Agendei a chamada de onboarding para terça-feira às 14h. Enviarei os detalhes da reunião por e-mail ainda hoje. Existe algum tópico específico que vocês gostariam que déssemos maior ênfase durante o treinamento?",
      sender: "usr_agent",
      senderName: "Michael Chen",
      senderRole: "cs_agent",
      createdAt: Date.now() - 86400000, // 1 dia atrás
      read: true,
    },
  ],
  "5": [
    {
      _id: "msg_5_1",
      conversationId: "5",
      content: "Olá! Gostaríamos de dar feedback sobre a nova atualização. Estamos adorando as novas funcionalidades, especialmente a integração com o Power BI e os relatórios personalizados.",
      sender: "usr_customer",
      senderName: "Fernando Santos (Future Tech)",
      senderRole: "customer",
      createdAt: Date.now() - 86400000 * 15, // 15 dias atrás
      read: true,
    },
    {
      _id: "msg_5_2",
      conversationId: "5",
      content: "Olá Fernando! Muito obrigado pelo feedback positivo. Ficamos felizes em saber que estão gostando das novas funcionalidades. Há algo específico que poderia ser melhorado ou alguma outra funcionalidade que gostariam de ver implementada no futuro?",
      sender: "ai",
      senderName: "Assistente IA",
      senderRole: "ai",
      createdAt: Date.now() - 86400000 * 15 + 7200000, // 15 dias atrás + 2 horas
      read: true,
    },
    {
      _id: "msg_5_3",
      conversationId: "5",
      content: "Seria interessante ter uma funcionalidade de exportação em massa de relatórios e talvez mais opções de alertas personalizados.",
      sender: "usr_customer",
      senderName: "Fernando Santos (Future Tech)",
      senderRole: "customer",
      createdAt: Date.now() - 86400000 * 10, // 10 dias atrás
      read: true,
    },
    {
      _id: "msg_5_4",
      conversationId: "5",
      content: "Anotado, Fernando! Suas sugestões são muito valiosas. Vou encaminhar para nossa equipe de produto para que possam considerar essas funcionalidades em futuras atualizações. Se tiver mais sugestões, fique à vontade para compartilhar conosco.",
      sender: "ai",
      senderName: "Assistente IA",
      senderRole: "ai",
      createdAt: Date.now() - 86400000 * 7, // 7 dias atrás
      read: true,
    },
  ],
};

// Dados mockados para anexos
export const mockAttachments: Record<string, MockAttachment> = {
  "att_1": {
    _id: "att_1",
    fileName: "erro_log.txt",
    fileId: "file_1",
    fileType: "text/plain",
    fileSize: 2540,
    uploadedBy: "usr_customer",
    conversationId: "1",
    messageId: "msg_1_1",
    createdAt: Date.now() - 86400000 * 2,
    url: "https://example.com/files/erro_log.txt",
  },
  "att_2": {
    _id: "att_2",
    fileName: "erro_403_detalhado.pdf",
    fileId: "file_2",
    fileType: "application/pdf",
    fileSize: 157840,
    uploadedBy: "usr_customer",
    conversationId: "1",
    messageId: "msg_1_3",
    createdAt: Date.now() - 86400000 + 7200000,
    url: "https://example.com/files/erro_403_detalhado.pdf",
  },
  "att_3": {
    _id: "att_3",
    fileName: "guia_relatorios.pdf",
    fileId: "file_3",
    fileType: "application/pdf",
    fileSize: 3256800,
    uploadedBy: "ai",
    conversationId: "2",
    messageId: "msg_2_4",
    createdAt: Date.now() - 43200000,
    url: "https://example.com/files/guia_relatorios.pdf",
  },
};

// Dados mockados para clientes
export const mockCustomers: MockCustomer[] = [
  {
    id: "cust_1",
    name: "Acme Inc",
    email: "contato@acme.com",
    company: "Acme Inc",
    projects: [
      {
        id: "proj_1",
        name: "Implementação CRM",
        status: "active",
        startDate: Date.now() - 86400000 * 30,
      }
    ]
  },
  {
    id: "cust_2",
    name: "TechGiant",
    email: "suporte@techgiant.com",
    company: "TechGiant",
    projects: [
      {
        id: "proj_2",
        name: "Migração de Plataforma",
        status: "active",
        startDate: Date.now() - 86400000 * 45,
      }
    ]
  },
  {
    id: "cust_3",
    name: "Innovate Co",
    email: "contato@innovateco.com",
    company: "Innovate Co",
    projects: []
  },
  {
    id: "cust_4",
    name: "Global Services",
    email: "atendimento@globalservices.com",
    company: "Global Services",
    projects: [
      {
        id: "proj_3",
        name: "Expansão Regional",
        status: "active",
        startDate: Date.now() - 86400000 * 15,
      }
    ]
  },
  {
    id: "cust_5",
    name: "Future Tech",
    email: "contato@futuretech.com",
    company: "Future Tech",
    projects: [
      {
        id: "proj_4",
        name: "Integração de Sistemas",
        status: "completed",
        startDate: Date.now() - 86400000 * 90,
      }
    ]
  },
];

// Função utilitária para filtrar conversas
export function filterMockConversations(options: {
  status?: string;
  isAIAssisted?: boolean;
  searchQuery?: string;
}) {
  let filtered = [...mockConversations];
  
  if (options.status) {
    filtered = filtered.filter(conv => conv.status === options.status);
  }
  
  if (options.isAIAssisted !== undefined) {
    filtered = filtered.filter(conv => conv.isAIAssisted === options.isAIAssisted);
  }
  
  if (options.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    filtered = filtered.filter(conv => 
      conv.title.toLowerCase().includes(query) || 
      conv.customerName.toLowerCase().includes(query)
    );
  }
  
  return filtered;
}

// Função para buscar mensagens por ID de conversa
export function getMockMessages(conversationId: string) {
  return mockMessages[conversationId] || [];
}

// Função para buscar anexo por ID
export function getMockAttachment(attachmentId: string) {
  return mockAttachments[attachmentId];
}

// Função para adicionar uma nova mensagem
export function addMockMessage(message: Omit<MockMessage, "_id">) {
  const messageId = `msg_${Date.now()}`;
  const newMessage: MockMessage = {
    _id: messageId,
    ...message,
  };
  
  if (!mockMessages[message.conversationId]) {
    mockMessages[message.conversationId] = [];
  }
  
  mockMessages[message.conversationId].push(newMessage);
  
  // Atualizar a conversa
  const conversation = mockConversations.find(c => c._id === message.conversationId);
  if (conversation) {
    conversation.lastMessageAt = message.createdAt;
    conversation.updatedAt = message.createdAt;
    if (!message.read) {
      conversation.unreadMessages += 1;
    }
  }
  
  return messageId;
}

// Função para marcar mensagens como lidas
export function markMockMessagesAsRead(conversationId: string) {
  const messages = mockMessages[conversationId] || [];
  
  messages.forEach(message => {
    message.read = true;
  });
  
  const conversation = mockConversations.find(c => c._id === conversationId);
  if (conversation) {
    conversation.unreadMessages = 0;
  }
  
  return { success: true, count: messages.length };
}

// Função para atualizar status da conversa
export function updateMockConversationStatus(id: string, status: "open" | "closed") {
  const conversation = mockConversations.find(c => c._id === id);
  if (conversation) {
    conversation.status = status;
    conversation.updatedAt = Date.now();
    return { success: true };
  }
  return { success: false };
}

// Função para atribuir conversa
export function assignMockConversation(id: string, assignee: string, isAIAssisted: boolean) {
  const conversation = mockConversations.find(c => c._id === id);
  if (conversation) {
    conversation.assignee = assignee;
    conversation.isAIAssisted = isAIAssisted;
    conversation.updatedAt = Date.now();
    return { success: true };
  }
  return { success: false };
}

// Função para criar nova conversa
export function createMockConversation(data: {
  title: string;
  customerName: string;
  customerId: string;
  projectId?: string;
  isAIAssisted: boolean;
  initialMessage: string;
  senderName: string;
  senderRole: string;
}) {
  const now = Date.now();
  const conversationId = `conv_${now}`;
  
  const newConversation: MockConversation = {
    _id: conversationId,
    title: data.title,
    customerName: data.customerName,
    customerId: data.customerId,
    projectId: data.projectId,
    status: "open",
    assignee: data.isAIAssisted ? "AI" : undefined,
    isAIAssisted: data.isAIAssisted,
    createdAt: now,
    updatedAt: now,
    lastMessageAt: now,
    unreadMessages: 1,
  };
  
  mockConversations.push(newConversation);
  
  // Adicionar mensagem inicial
  const messageId = `msg_${conversationId}_1`;
  const initialMessage: MockMessage = {
    _id: messageId,
    conversationId,
    content: data.initialMessage,
    sender: data.customerId,
    senderName: data.senderName,
    senderRole: data.senderRole as any,
    createdAt: now,
    read: false,
  };
  
  mockMessages[conversationId] = [initialMessage];
  
  return conversationId;
} 