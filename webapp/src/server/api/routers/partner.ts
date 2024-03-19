import type { Media, Partner } from "~/payload/payload-types";
import { createTRPCRouter, userProtectedProcedure } from "~/server/api/trpc";
import { ZGetListParams } from "~/server/types";

export interface PartnerIncluded extends Partner {
  icon: Media;
}

export const partnerRouter = createTRPCRouter({
  getList: userProtectedProcedure
    .input(ZGetListParams)
    .query(async ({ ctx, input }) => {
      const { perPage, page, sort } = input;

      const partners = await ctx.payload.find({
        collection: "partners",
        limit: perPage,
        page: page,
        sort,
      });

      return {
        data: partners.docs as PartnerIncluded[],
        metadata: { page, count: partners.docs.length },
      };
    }),
});
