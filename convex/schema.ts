import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    author: v.string(),
    body: v.string(),
  }),
  stats: defineTable({
    author: v.string(),
    body: v.string(),
  })
})
  
