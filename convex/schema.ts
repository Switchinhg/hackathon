import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  coords: defineTable({
    author:v.string(),
    tool:v.string(),
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
  })
})
  
