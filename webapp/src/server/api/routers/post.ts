import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getList: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.payload.find({
      collection: "offers",
      limit: 10,
      depth: 0,
    });

    return { data: data.docs };
  }),
});
