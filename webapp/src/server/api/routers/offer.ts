import { z } from "zod";
import { Category, Offer, Media, Partner } from "~/payload/payload-types";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { ZGetListParams } from "~/server/types";

export interface OfferIncluded extends Offer {
  partner: Partner & { icon: Media };
  category: Category & { icon: Media };
}

export const offerRouter = createTRPCRouter({
  getList: protectedProcedure
    .input(
      ZGetListParams.merge(z.object({ categoryId: z.number().optional() }))
    )
    .query(async ({ ctx, input }) => {
      const { perPage, page, sort, categoryId } = input;

      const offers = await ctx.payload.find({
        collection: "offers",
        limit: perPage,
        page: page,
        where: categoryId
          ? {
              category: {
                equals: categoryId,
              },
            }
          : {},
        sort,
      });

      const couponCountOfOffers = await ctx.payload.find({
        collection: "coupons",
        depth: 0,
        where: {
          offer: {
            in: offers.docs.map((offer) => offer.id),
          },
        },
      });

      const offersFiltered = offers.docs.filter((offer) => {
        const couponCount = couponCountOfOffers.docs.filter(
          (coupon) =>
            coupon.offer === offer.id &&
            coupon.status === "available" &&
            (coupon.user === undefined ||
              coupon.user === null ||
              coupon.user === ctx.session.id)
        ).length;

        if (couponCount > 0) return offer;
      });

      return {
        data: offersFiltered as OfferIncluded[],
        metadata: { page, count: offers.docs.length },
      };
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const offer = await ctx.payload.findByID({
        collection: "offers",
        id,
      });

      return { data: offer as OfferIncluded };
    }),
});
