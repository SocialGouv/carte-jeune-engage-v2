import { TRPCError } from "@trpc/server";
import { Payload } from "payload";
import APIError from "payload/dist/errors/APIError";
import { use } from "react";
import { z } from "zod";
import { Media, User } from "~/payload/payload-types";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateRandomCode, generateRandomPassword, payloadOrPhoneNumberCheck } from "~/utils/tools";
import { generatePasswordSaltHash } from 'payload/dist/auth/strategies/local/generatePasswordSaltHash'

export interface UserIncluded extends User {
	image: Media;
}

const generateAndSendOTP = async (payload: Payload, phone_number: string, firstLogin: boolean) => {
	const code = generateRandomCode();

	const hasDialingCode = phone_number.startsWith('+')
	const email = `${hasDialingCode ? `0${phone_number.substring(3)}` : phone_number}@cje.loc`

	if (firstLogin) {
		await payload.create({
			collection: 'users',
			data: {
				email: email,
				password: code,
				phone_number: phone_number,
			}
		})
	} else {
		const { hash, salt } = await generatePasswordSaltHash({ password: code })
		await payload.update({
			collection: 'users',
			where: {
				email: { equals: email }
			},
			data: {
				hash,
				salt
			},
		})
	}

	// SEND SMS
	console.log(code)
}

export const userRouter = createTRPCRouter({
	register: publicProcedure
		.input(
			z.object({
				email: z.string().email(),
				phone_number: z.string(),
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

	oldLoginUser: publicProcedure
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

	loginUser: publicProcedure
		.input(
			z.object({
				phone_number: z.string(),
				otp: z.string()
			}))
		.mutation(async ({ ctx, input: userInput }) => {
			const { phone_number, otp } = userInput
			const hasDialingCode = phone_number.startsWith('+')

			try {
				const session = await ctx.payload.login({
					collection: 'users',
					data: {
						email: `${hasDialingCode ? `0${phone_number.substring(3)}` : phone_number}@cje.loc`,
						password: otp
					}
				})

				const { hash, salt } = await generatePasswordSaltHash({ password: generateRandomPassword(16) })
				await ctx.payload.update({
					collection: 'users',
					id: session.user.id,
					data: {
						hash,
						salt
					}
				})

				return { data: session };
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

	generateOTP: publicProcedure
		.input(
			z.object({
				phone_number: z.string(),
			})
		)
		.mutation(async ({ ctx, input: userInput }) => {
			const { phone_number } = userInput

			const users = await ctx.payload.find({
				collection: 'users',
				limit: 1,
				page: 1,
				where: {
					...payloadOrPhoneNumberCheck(phone_number)
				}
			})

			if (!users.docs.length) {
				const permissions = await ctx.payload.find({
					collection: 'permissions',
					limit: 1,
					page: 1,
					where: {
						...payloadOrPhoneNumberCheck(phone_number)
					}
				})

				if (!permissions.docs.length) {
					throw new TRPCError({
						code: "UNAUTHORIZED",
						message: "Phone number does not exists on the database",
					});
				} else {
					await generateAndSendOTP(ctx.payload, phone_number, true)
					return { data: 'ok' }
				}
			} else {
				await generateAndSendOTP(ctx.payload, phone_number, false)
				return { data: 'ok' }
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
