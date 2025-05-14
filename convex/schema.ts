import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  numbers: defineTable({
    value: v.number(),
  }),

  conversations: defineTable({
    title: v.string(),
    customerName: v.string(),
    customerId: v.string(),
    projectId: v.optional(v.string()),
    status: v.string(), // "open" | "closed"
    assignee: v.optional(v.string()),
    isAIAssisted: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
    lastMessageAt: v.number(),
    unreadMessages: v.number(),
  }),

  messages: defineTable({
    conversationId: v.id("conversations"),
    content: v.string(),
    sender: v.string(), // userId ou "ai"
    senderName: v.string(),
    senderRole: v.string(), // "customer", "cs_agent", "ai"
    createdAt: v.number(),
    read: v.boolean(),
    attachments: v.optional(v.array(v.string())),
  }),

  attachments: defineTable({
    fileName: v.string(),
    fileId: v.string(), // ID do arquivo no storage do Convex
    fileType: v.string(),
    fileSize: v.number(),
    uploadedBy: v.string(),
    conversationId: v.optional(v.id("conversations")),
    messageId: v.optional(v.id("messages")),
    createdAt: v.number(),
  }),
});
