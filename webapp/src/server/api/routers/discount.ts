import { Category, Discount, Media, Partner } from "~/payload/payload-types";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ZGetListParams } from "~/server/types";

interface DiscountIncluded extends Discount {
  partner: Partner & { icon: Media };
  category: Category & { icon: Media };
}

export const discountRouter = createTRPCRouter({
  getList: publicProcedure
    .input(ZGetListParams)
    .query(async ({ ctx, input }) => {
      const { perPage, page, sort } = input;

      const discounts = await ctx.payload.find({
        collection: "discounts",
        limit: perPage,
        page: page,
        sort,
      });

      return {
        data: discounts.docs as DiscountIncluded[],
        metadata: { page, count: discounts.docs.length },
      };
    }),
});
