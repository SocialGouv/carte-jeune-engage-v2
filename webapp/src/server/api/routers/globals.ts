import {
  createTRPCRouter,
  publicProcedure,
  userProtectedProcedure,
} from "~/server/api/trpc";
import { PartnerIncluded } from "./partner";
import { OfferIncluded } from "./offer";
import { Media } from "~/payload/payload-types";

export const globalsRouter = createTRPCRouter({
  quickAccessGetAll: userProtectedProcedure.query(async ({ ctx }) => {
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

  landingPartnersGetLogos: publicProcedure.query(async ({ ctx }) => {
    const landingPartners = await ctx.payload.findGlobal({
      slug: "landingPartners",
      depth: 3,
    });

    const partners = landingPartners.items?.map(
      (item) => item.partner
    ) as PartnerIncluded[];

    const logoPartners = partners.map((partner) => partner.icon);

    return {
      data: logoPartners,
    };
  }),
});
