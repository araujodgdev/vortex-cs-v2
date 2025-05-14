import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Gera URL para upload de arquivo
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Salva informações sobre um arquivo após o upload
export const saveAttachment = mutation({
  args: {
    fileName: v.string(),
    fileId: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
    uploadedBy: v.string(),
    conversationId: v.optional(v.id("conversations")),
    messageId: v.optional(v.id("messages")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    const attachmentId = await ctx.db.insert("attachments", {
      fileName: args.fileName,
      fileId: args.fileId,
      fileType: args.fileType,
      fileSize: args.fileSize,
      uploadedBy: args.uploadedBy,
      conversationId: args.conversationId,
      messageId: args.messageId,
      createdAt: now,
    });

    return attachmentId;
  },
});

// Obtém URL de download para um arquivo
export const getAttachmentUrl = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.fileId);
  },
});

// Lista anexos para uma conversa específica
export const listAttachmentsForConversation = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const attachments = await ctx.db.query("attachments")
      .filter(q => q.eq(q.field("conversationId"), args.conversationId))
      .order("desc")
      .collect();

    return attachments;
  },
});

// Remove um anexo
export const deleteAttachment = mutation({
  args: {
    attachmentId: v.id("attachments"),
  },
  handler: async (ctx, args) => {
    const attachment = await ctx.db.get(args.attachmentId);
    if (!attachment) {
      throw new Error("Anexo não encontrado");
    }

    // Exclui o arquivo do storage
    await ctx.storage.delete(attachment.fileId);
    
    // Remove o registro do banco de dados
    await ctx.db.delete(args.attachmentId);

    return { success: true };
  },
}); 