import { z } from "zod";
import { Coupon, Media, Offer, User } from "~/payload/payload-types";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

interface CouponIncluded extends Coupon {
  offer: Offer & { icon: Media };
  userRouter: User;
}

export const couponRouter = createTRPCRouter({
  getOneAvailable: protectedProcedure
    .input(z.object({ offer_id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { offer_id } = input;

      const coupons = await ctx.payload.find({
        collection: "coupons",
        where: {
          and: [
            { offer: { equals: offer_id } },
            { status: { equals: "available" } },
            { validityTo: { greater_than_equal: new Date() } },
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
          validityTo: z.string(),
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
});
