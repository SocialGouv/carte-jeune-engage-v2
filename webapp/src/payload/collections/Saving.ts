import { type CollectionConfig } from "payload/types";

export const Savings: CollectionConfig = {
  slug: "savings",
  labels: {
    singular: "Économie",
    plural: "Économies",
  },
  fields: [
    {
      name: "amount",
      type: "number",
      label: "Montant",
      min: 0,
      admin: {
        step: 0.5,
      },
      required: true,
    },
    {
      name: "coupon",
      type: "relationship",
      label: "Coupon",
      relationTo: "coupons",
      hasMany: false,
      required: true,
    },
  ],
};
