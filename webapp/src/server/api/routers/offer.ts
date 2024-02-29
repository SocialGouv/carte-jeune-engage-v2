import { Where, WhereField } from "payload/types";
import { z } from "zod";
import { Category, Offer, Media, Partner } from "~/payload/payload-types";
import { createTRPCRouter, userProtectedProcedure } from "~/server/api/trpc";
import { ZGetListParams } from "~/server/types";
import { payloadWhereOfferIsValid } from "~/utils/tools";

export interface OfferIncluded extends Offer {
  partner: Partner & { icon: Media };
  category: Category & { icon: Media };
  imageOfEligibleStores: Media;
}

export const offerRouter = createTRPCRouter({
  getListOfAvailables: userProtectedProcedure
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
        ...payloadWhereOfferIsValid(),
      } as Where;

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
        limit: 10000,
        where: {
          offer: {
            in: offers.docs.map((offer) => offer.id),
          },
        },
      });

      const offersFiltered = offers.docs.filter((offer) => {
        const couponFiltered = couponCountOfOffers.docs.filter(
          (coupon) => coupon.offer === offer.id
        );

        let couponCount = 0;

        if (isCurrentUser) {
          couponCount = couponFiltered.filter(
            (coupon) => coupon.user === ctx.session.id && coupon.used === false
          ).length;
        } else {
          if (offer.kind === "voucher_pass" || offer.kind === "code_space")
            return offer;

          couponCount = couponFiltered.filter(
            (coupon) =>
              (coupon.user === undefined ||
                coupon.user === null ||
                coupon.user === ctx.session.id) &&
              coupon.used === false
          ).length;
        }

        if (couponCount > 0) return offer;
      });

      return {
        data: offersFiltered as OfferIncluded[],
        metadata: { page, count: offers.docs.length },
      };
    }),

  getById: userProtectedProcedure
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
