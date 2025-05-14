import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Consulta para listar todas as conversas
export const listConversations = query({
  args: {
    status: v.optional(v.string()),
    isAIAssisted: v.optional(v.boolean()),
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let conversations = await ctx.db.query("conversations")
      .order("desc")
      .collect();

    // Filtragem por status
    if (args.status) {
      conversations = conversations.filter(
        conversation => conversation.status === args.status
      );
    }

    // Filtragem por assistência de IA
    if (args.isAIAssisted !== undefined) {
      conversations = conversations.filter(
        conversation => conversation.isAIAssisted === args.isAIAssisted
      );
    }

    // Filtragem por termo de pesquisa
    if (args.searchQuery) {
      const query = args.searchQuery.toLowerCase();
      conversations = conversations.filter(
        conversation => 
          conversation.title.toLowerCase().includes(query) ||
          conversation.customerName.toLowerCase().includes(query)
      );
    }

    return conversations;
  },
});

// Consulta para obter detalhes de uma única conversa
export const getConversation = query({
  args: { id: v.id("conversations") },
  handler: async (ctx, args) => {
    const conversation = await ctx.db.get(args.id);
    if (!conversation) {
      throw new Error("Conversa não encontrada");
    }
    return conversation;
  },
});

// Consulta para obter mensagens de uma conversa
export const getMessages = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const messages = await ctx.db.query("messages")
      .filter(q => q.eq(q.field("conversationId"), args.conversationId))
      .order("asc")
      .collect();

    return messages;
  },
});

// Mutation para criar uma nova conversa
export const createConversation = mutation({
  args: {
    title: v.string(),
    customerName: v.string(),
    customerId: v.string(),
    projectId: v.optional(v.string()),
    isAIAssisted: v.boolean(),
    initialMessage: v.string(),
    senderName: v.string(),
    senderRole: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    const conversationId = await ctx.db.insert("conversations", {
      title: args.title,
      customerName: args.customerName,
      customerId: args.customerId,
      projectId: args.projectId,
      status: "open",
      assignee: args.isAIAssisted ? "AI" : undefined,
      isAIAssisted: args.isAIAssisted,
      createdAt: now,
      updatedAt: now,
      lastMessageAt: now,
      unreadMessages: 1,
    });

    // Adiciona a mensagem inicial
    await ctx.db.insert("messages", {
      conversationId,
      content: args.initialMessage,
      sender: args.customerId,
      senderName: args.senderName,
      senderRole: args.senderRole,
      createdAt: now,
      read: false,
    });

    return conversationId;
  },
});

// Mutation para adicionar uma mensagem à conversa
export const addMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    content: v.string(),
    sender: v.string(),
    senderName: v.string(),
    senderRole: v.string(),
    attachments: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Verifica se a conversa existe
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new Error("Conversa não encontrada");
    }

    // Adiciona a mensagem
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      content: args.content,
      sender: args.sender,
      senderName: args.senderName,
      senderRole: args.senderRole,
      createdAt: now,
      read: false,
      attachments: args.attachments,
    });

    // Atualiza a conversa
    await ctx.db.patch(args.conversationId, {
      updatedAt: now,
      lastMessageAt: now,
      unreadMessages: conversation.unreadMessages + 1,
    });

    return messageId;
  },
});

// Mutation para marcar mensagens como lidas
export const markMessagesAsRead = mutation({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    // Verifica se a conversa existe
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new Error("Conversa não encontrada");
    }

    // Obtém as mensagens não lidas
    const unreadMessages = await ctx.db.query("messages")
      .filter(q => 
        q.and(
          q.eq(q.field("conversationId"), args.conversationId),
          q.eq(q.field("read"), false)
        )
      )
      .collect();

    // Marca cada mensagem como lida
    for (const message of unreadMessages) {
      await ctx.db.patch(message._id, {
        read: true,
      });
    }

    // Atualiza o contador de mensagens não lidas
    await ctx.db.patch(args.conversationId, {
      unreadMessages: 0,
    });

    return { success: true, count: unreadMessages.length };
  },
});

// Mutation para atualizar o status de uma conversa
export const updateConversationStatus = mutation({
  args: {
    id: v.id("conversations"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    // Verifica se a conversa existe
    const conversation = await ctx.db.get(args.id);
    if (!conversation) {
      throw new Error("Conversa não encontrada");
    }

    // Atualiza o status
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Mutation para atribuir uma conversa a um agente
export const assignConversation = mutation({
  args: {
    id: v.id("conversations"),
    assignee: v.string(),
    isAIAssisted: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Verifica se a conversa existe
    const conversation = await ctx.db.get(args.id);
    if (!conversation) {
      throw new Error("Conversa não encontrada");
    }

    // Atualiza o assignee
    await ctx.db.patch(args.id, {
      assignee: args.assignee,
      isAIAssisted: args.isAIAssisted,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
}); 