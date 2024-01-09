import { Category, Discount, Media, Partner } from "~/payload/payload-types";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface DiscountIncluded extends Discount {
  partner: Partner & { icon: Media };
  category: Category & { icon: Media };
}

export const discountRouter = createTRPCRouter({
  getList: publicProcedure.query(async ({ ctx }) => {
    const discounts = await ctx.payload.find({
      collection: "discounts",
      limit: 100,
    });

    return { data: discounts.docs as DiscountIncluded[] };
  }),
});
