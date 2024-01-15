import { Category, Offer, Media, Partner } from "~/payload/payload-types";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { ZGetListParams } from "~/server/types";

interface OfferIncluded extends Offer {
  partner: Partner & { icon: Media };
  category: Category & { icon: Media };
}

export const offerRouter = createTRPCRouter({
  getList: protectedProcedure
    .input(ZGetListParams)
    .query(async ({ ctx, input }) => {
      const { perPage, page, sort } = input;

      const offers = await ctx.payload.find({
        collection: "offers",
        limit: perPage,
        page: page,
        sort,
      });

      return {
        data: offers.docs as OfferIncluded[],
        metadata: { page, count: offers.docs.length },
      };
    }),
});
