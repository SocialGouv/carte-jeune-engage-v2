import { Where, WhereField } from "payload/types";
import { z } from "zod";
import { Category, Offer, Media, Partner } from "~/payload/payload-types";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { ZGetListParams } from "~/server/types";

export interface OfferIncluded extends Offer {
  partner: Partner & { icon: Media };
  category: Category & { icon: Media };
}

export const offerRouter = createTRPCRouter({
  getListOfAvailables: protectedProcedure
    .input(
      ZGetListParams.merge(
        z.object({
          categoryId: z.number().optional(),
          isCurrentUser: z.boolean().optional(),
        })
      )
    )
    .query(async ({ ctx, input }) => {
      const { perPage, page, sort, categoryId, isCurrentUser } = input;

      let where = {} as Record<keyof Offer, Where | WhereField>;

      where.validityTo = {
        greater_than_equal: new Date(),
      };

      if (categoryId) {
        where.category = {
          equals: categoryId,
        };
      }

      const offers = await ctx.payload.find({
        collection: "offers",
        limit: perPage,
        page: page,
        where: where as Where,
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
        const couponFiltered = couponCountOfOffers.docs.filter(
          (coupon) => coupon.offer === offer.id && coupon.status === "available"
        );

        let couponCount = 0;

        if (isCurrentUser) {
          couponCount = couponFiltered.filter(
            (coupon) => coupon.user === ctx.session.id
          ).length;
        } else {
          couponCount = couponFiltered.filter(
            (coupon) =>
              coupon.user === undefined ||
              coupon.user === null ||
              coupon.user === ctx.session.id
          ).length;
        }

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
