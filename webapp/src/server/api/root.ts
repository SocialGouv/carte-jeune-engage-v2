import { createTRPCRouter } from "~/server/api/trpc";

import { userRouter } from "./routers/user";
import { categoryRouter } from "./routers/category";
import { offerRouter } from "./routers/offer";
import { couponRouter } from "./routers/coupon";
import { partnerRouter } from "./routers/partner";
import { quickAccessRouter } from "./routers/quickAccess";
import { savingRouter } from "./routers/saving";
import { permissionRouter } from "./routers/permission";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  category: categoryRouter,
  offer: offerRouter,
  coupon: couponRouter,
  partner: partnerRouter,
  quickAccess: quickAccessRouter,
  saving: savingRouter,
  permission: permissionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
