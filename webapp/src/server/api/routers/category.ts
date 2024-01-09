import type { Category, Media } from "~/payload/payload-types";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface CategoryIncluded extends Category {
  icon: Media;
}

export const categoryRouter = createTRPCRouter({
  getList: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.payload.find({
      collection: "categories",
      sort: "createdAt",
      limit: 100,
    });

    return { data: categories.docs as CategoryIncluded[] };
  }),
});
