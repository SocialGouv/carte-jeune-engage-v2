import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
	createTRPCRouter,
	supervisorProtectedProcedure
} from "~/server/api/trpc";

export const permissionRouter = createTRPCRouter({
	create: supervisorProtectedProcedure
		.input(
			z.object({
				phone_number: z.string(),
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
});
