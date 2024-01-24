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

      return {
        data: offers.docs as OfferIncluded[],
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
