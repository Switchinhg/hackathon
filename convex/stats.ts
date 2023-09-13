import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const send = mutation({
    args: { body: v.string(), author: v.string() },
    handler: async (ctx, { body, author }) => {
      // Send a new message.
      await ctx.db.insert("stats", { body, author });
    },
  });

export const list = query({
    args: {},
    handler: async (ctx) => {
      // Grab the most recent messages.
      const messages = await ctx.db.query("stats").order("desc").take(100);
      // Reverse the list so that it's in a chronological order.
      return messages.reverse();
    },
  });