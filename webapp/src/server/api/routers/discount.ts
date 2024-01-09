import { TRPCError } from "@trpc/server";
import APIError from "payload/dist/errors/APIError";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const discountRouter = createTRPCRouter({
  getList: publicProcedure.query(async ({ ctx }) => {
    const discounts = await ctx.payload.find({
      collection: "discounts",
      limit: 100,
    });

    return { data: discounts.docs };
  }),
});
