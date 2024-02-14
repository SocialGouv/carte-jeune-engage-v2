import { TRPCError } from "@trpc/server";
import APIError from "payload/dist/errors/APIError";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  supervisorProtectedProcedure,
} from "~/server/api/trpc";

export const permissionRouter = createTRPCRouter({
  create: supervisorProtectedProcedure
    .input(
      z.object({
        phone: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const permission = await ctx.payload.create({
          collection: "permissions",
          data: {
            ...input,
          },
        });

        return {
          data: permission,
        };
      } catch (error: any) {
        const firstError = error?.data[0];
        if (firstError) {
          if (
            firstError.field === "phone" &&
            firstError.message?.includes("must be unique")
          ) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Phone already whitelisted",
              cause: error,
            });
          }
        }
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Unknown error",
          cause: error,
        });
      }
    }),

  isWhiteListed: publicProcedure
    .input(
      z.object({
        phone: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const permissions = await ctx.payload.find({
        collection: "permissions",
        page: 1,
        limit: 1,
        where: {
          phone: { equals: input.phone },
        },
      });

      return {
        isWhiteListed: !!permissions.docs.length,
      };
    }),
});
