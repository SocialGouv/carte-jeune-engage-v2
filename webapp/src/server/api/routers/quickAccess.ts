import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { PartnerIncluded } from "./partner";
import { OfferIncluded } from "./offer";

export const quickAccessRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const quickAccess = await ctx.payload.findGlobal({
      slug: "quickAccess",
      depth: 3,
    });

    const partners = quickAccess.items as {
      partner: PartnerIncluded;
      offer: OfferIncluded;
      id?: string;
    }[];

    return {
      data: partners,
    };
  }),
});
