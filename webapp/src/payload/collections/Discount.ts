import { type CollectionConfig } from "payload/types";

export const Discounts: CollectionConfig = {
  slug: "discounts",
  labels: {
    singular: "Réduction",
    plural: "Réductions",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Titre",
      required: true,
    },
    {
      name: "partner",
      type: "relationship",
      label: "Partenaire",
      relationTo: "partners",
      hasMany: false,
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      label: "Catégorie",
      relationTo: "categories",
      hasMany: false,
      required: true,
    },
    {
      type: "select",
      name: "kind",
      label: "Type",
      required: true,
      options: [
        { label: "Bon d'achat", value: "voucher" },
        { label: "Code de réduction", value: "code" },
      ],
    },
  ],
};
