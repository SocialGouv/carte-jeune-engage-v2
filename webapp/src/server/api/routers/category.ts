import type { Category, Media } from "~/payload/payload-types";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ZGetListParams } from "~/server/types";

interface CategoryIncluded extends Category {
  icon: Media;
}

export const categoryRouter = createTRPCRouter({
  getList: publicProcedure
    .input(ZGetListParams)
    .query(async ({ ctx, input }) => {
      const { perPage, page, sort } = input;

      const categories = await ctx.payload.find({
        collection: "categories",
        limit: perPage,
        page: page,
        sort,
      });

      return {
        data: categories.docs as CategoryIncluded[],
        metadata: { page, count: categories.docs.length },
      };
    }),
});
