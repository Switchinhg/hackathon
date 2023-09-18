import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getLine = query({
  args: {},
  handler: async (ctx) => {
    // Grab the most recent messages.
    const coordenates = await ctx.db.query("coords").order("desc").take(1);
    // Reverse the list so that it's in a chronological order.
    return coordenates;
  },
});

export const makeLine = mutation({
  args: { width: v.number(), color: v.string(), x0: v.number(), y0: v.number(), x1:v.number(), y1: v.number() },
  handler: async (ctx, { width, color,x0,y0,x1,y1 }) => {
    // Sends a new line.
    await ctx.db.insert("coords", {  width, color,x0,y0,x1,y1});
  },
});

export const createCanvas = mutation({
  args: { author: v.string(), status: v.boolean() },
  handler: async (ctx, { author, status }) => {
    // Creates a new Canvas.
    await ctx.db.insert("canvas", { author, status });
  },
});
