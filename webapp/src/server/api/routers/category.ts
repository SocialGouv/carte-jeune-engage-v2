import { TRPCError } from "@trpc/server";
import APIError from "payload/dist/errors/APIError";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getList: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.payload.find({
      collection: "categories",
      sort: "createdAt",
      limit: 100,
    });

    return { data: categories.docs };
  }),
});
