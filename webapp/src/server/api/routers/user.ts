import { TRPCError } from "@trpc/server";
import APIError from "payload/dist/errors/APIError";
import { z } from "zod";
import { Media, User } from "~/payload/payload-types";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export interface UserIncluded extends User {
	image: Media;
}

export const userRouter = createTRPCRouter({
	register: publicProcedure
		.input(
			z.object({
				email: z.string().email(),
				firstName: z.string(),
				lastName: z.string(),
				password: z.string(),
			})
		)
		.mutation(async ({ ctx, input: userInput }) => {
			try {
				const newUser = await ctx.payload.create({
					collection: "users",
					data: userInput,
				});

				return { data: newUser };
			} catch (error: unknown) {
				if (error instanceof APIError) {
					if (
						error.data[0].field === "email" &&
						error.data[0].message.includes("registered")
					) {
						throw new TRPCError({
							code: "CONFLICT",
							message: "Email already registered",
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

	loginUser: publicProcedure
		.input(
			z.object({
				email: z.string().email(),
				password: z.string(),
			})
		)
		.mutation(async ({ ctx, input: userInput }) => {
			try {
				const user = await ctx.payload.login({
					collection: "users",
					data: userInput,
				});

				return { data: user };
			} catch (error) {
				if (error && typeof error === "object" && "status" in error) {
					if (error.status === 401) {
						throw new TRPCError({
							code: "UNAUTHORIZED",
							message: "Invalid email or password",
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

	loginSupervisor: publicProcedure
		.input(
			z.object({
				email: z.string().email(),
				password: z.string(),
			})
		)
		.mutation(async ({ ctx, input: userInput }) => {
			try {
				const user = await ctx.payload.login({
					collection: "supervisors",
					data: userInput,
				});

				return { data: user };
			} catch (error) {
				if (error && typeof error === "object" && "status" in error) {
					if (error.status === 401) {
						throw new TRPCError({
							code: "UNAUTHORIZED",
							message: "Invalid email or password",
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
