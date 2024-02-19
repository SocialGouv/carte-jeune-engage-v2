import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Coupon, Media, Offer, Partner, User } from "~/payload/payload-types";
import { createTRPCRouter, userProtectedProcedure } from "~/server/api/trpc";

export interface CouponIncluded extends Coupon {
	offer: Offer & { icon: Media; partner: Partner };
	userRouter: User;
}

export const couponRouter = createTRPCRouter({
	getOne: userProtectedProcedure
		.input(z.object({ offer_id: z.number() }))
		.query(async ({ ctx, input }) => {
			const { offer_id } = input;

			const coupons = await ctx.payload.find({
				collection: "coupons",
				depth: 2,
				where: {
					and: [
						{ offer: { equals: offer_id } },
						{ user: { equals: ctx.session.id } },
						{
							"offer.validityTo": {
								greater_than_equal: new Date().toISOString().split("T")[0],
							},
						},
						{ used: { equals: false } },
					],
				},
			});

			return { data: coupons.docs[0] as CouponIncluded };
		}),

	assignToUser: userProtectedProcedure
		.input(z.object({ offer_id: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const { offer_id } = input;

			const coupons = await ctx.payload.find({
				collection: "coupons",
				where: {
					and: [
						{ offer: { equals: offer_id } },
						{
							"offer.validityTo": {
								greater_than_equal: new Date().toISOString().split("T")[0],
							},
						},
						{ used: { equals: false } },
					],
				},
			});

			const couponsFiltered = coupons.docs.filter(
				(coupon) => coupon.user === undefined || coupon.user === null
			);

			if (couponsFiltered.length === 0) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "No coupons available for this offer",
				});
			}

			const couponData = couponsFiltered[0] as CouponIncluded;

			const updatedCoupon = await ctx.payload.update({
				collection: "coupons",
				id: couponData.id,
				data: { user: ctx.session.id },
			});

			return { data: updatedCoupon };
		}),
});
