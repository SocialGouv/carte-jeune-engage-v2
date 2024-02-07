import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { PartnerIncluded } from "./partner";
import { OfferIncluded } from "./offer";
import { z } from "zod";
import { Coupon } from "~/payload/payload-types";

export interface CouponExtanded extends Coupon {
  savingAmount: number | null;
  offer: OfferIncluded;
}

export const savingRouter = createTRPCRouter({
  getByUserId: protectedProcedure
    .input(
      z.object({
        userId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const userCouponsDocs = await ctx.payload.find({
        collection: "coupons",
        depth: 5,
        where: {
          user: {
            equals: userId,
          },
        },
        sort: "-usedAt",
      });

      let userCoupons = userCouponsDocs.docs as CouponExtanded[];

      const userSavings = await ctx.payload.find({
        collection: "savings",
        depth: 0,
        where: {
          coupon: {
            in: userCoupons.map((coupon) => coupon.id),
          },
        },
      });

      userCoupons = userCoupons
        .filter(
          (coupon) => !!userSavings.docs.find((s) => s.coupon === coupon.id)
        )
        .map((coupon) => {
          const saving = userSavings.docs.find((s) => s.coupon === coupon.id);
          if (saving)
            coupon.savingAmount =
              typeof saving.amount === "number"
                ? Math.round(saving.amount * 100) / 100
                : null;
          return coupon;
        });

      return {
        data: userCoupons,
      };
    }),

  getTotalAmountByUserId: protectedProcedure
    .input(
      z.object({
        userId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const userSavings = await ctx.payload.find({
        collection: "savings",
        depth: 0,
        where: {
          "coupon.user": {
            equals: userId,
          },
        },
      });

      const totalAmount = userSavings.docs.reduce(
        (total, saving) =>
          total + (typeof saving.amount === "number" ? saving.amount : 0),
        0
      );

      return {
        data: Math.round(totalAmount * 100) / 100,
      };
    }),
});