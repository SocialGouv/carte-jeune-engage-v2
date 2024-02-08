import { PaginatedDocs } from "payload/database";
import { Where, WhereField } from "payload/types";
import { z } from "zod";
import {
  Category,
  Offer,
  Media,
  Partner,
  Coupon,
} from "~/payload/payload-types";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { ZGetListParams } from "~/server/types";

export interface OfferIncluded extends Offer {
  partner: Partner & { icon: Media };
  category: Category & { icon: Media };
  coupons?: Coupon[];
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

      let where = {
        validityTo: {
          greater_than_equal: new Date().toISOString().split("T")[0],
        },
      } as Record<keyof Offer, Where | WhereField>;

      if (categoryId) {
        where.category = {
          equals: categoryId,
        };
      }

      const offers = (await ctx.payload.find({
        collection: "offers",
        limit: perPage,
        page: page,
        where: where as Where,
        sort,
      })) as PaginatedDocs<OfferIncluded>;

      const couponCountOfOffers = await ctx.payload.find({
        collection: "coupons",
        depth: 0,
        limit: 10000,
        page: 1,
        where: {
          offer: {
            in: offers.docs.map((offer) => offer.id),
          },
        },
      });

      const offersFiltered = offers.docs
        .map((offer) => {
          const couponFiltered = couponCountOfOffers.docs.filter(
            (coupon) => coupon.offer === offer.id
          );

          if (isCurrentUser) {
            offer.coupons = couponFiltered.filter(
              (coupon) =>
                coupon.user === ctx.session.id && coupon.used === false
            );
          } else {
            offer.coupons = couponFiltered.filter(
              (coupon) =>
                (coupon.user === undefined ||
                  coupon.user === null ||
                  coupon.user === ctx.session.id) &&
                coupon.used === false
            );
          }

          return offer;
        })
        .filter((offer) => !offer.coupons || offer.coupons.length > 0);

      return {
        data: offersFiltered,
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
