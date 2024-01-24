import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Coupon, Media, Offer, Partner, User } from "~/payload/payload-types";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

interface CouponIncluded extends Coupon {
  offer: Offer & { icon: Media; partner: Partner };
  userRouter: User;
}

export const couponRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ offer_id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { offer_id } = input;

      const coupons = await ctx.payload.find({
        collection: "coupons",
        depth: 2,
        where: {
          and: [
            { offer: { equals: offer_id } },
            { status: { equals: "available" } },
            { user: { equals: ctx.session.id } },
          ],
        },
      });

      return { data: coupons.docs[0] as CouponIncluded };
    }),
  create: protectedProcedure
    .input(
      z.array(
        z.object({
          code: z.string(),
          status: z.enum(["available", "archived"]),
          offer: z.number(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      const promises = input.map((data) => {
        return ctx.payload.create({
          collection: "coupons",
          data,
        });
      });

      const coupons = await Promise.all(promises);

      return { data: coupons };
    }),

  assignToUser: protectedProcedure
    .input(z.object({ offer_id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { offer_id } = input;

      const coupon = await ctx.payload.find({
        collection: "coupons",
        where: {
          and: [
            { offer: { equals: offer_id } },
            { status: { equals: "available" } },
          ],
        },
      });

      if (coupon.docs.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Coupon not found",
        });
      }

      const couponData = coupon.docs[0] as CouponIncluded;

      const updatedCoupon = await ctx.payload.update({
        collection: "coupons",
        id: couponData.id,
        data: { user: ctx.session.id },
      });

      return { data: updatedCoupon };
    }),
});
