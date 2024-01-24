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
});
