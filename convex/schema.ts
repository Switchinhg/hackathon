import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  coords: defineTable({
    width: v.number(),
    color: v.string(),
    x0: v.optional(v.number()),
    y0: v.number(),
    x1: v.number(),
    y1: v.number(),
  }),
  canvas: defineTable({
    author: v.string(),
    status: v.boolean()
  }),
  messages: defineTable({
    author: v.string(),
    body: v.string(),
  }),
  stats: defineTable({
    author: v.string(),
    body: v.string(),
  })
})
  
