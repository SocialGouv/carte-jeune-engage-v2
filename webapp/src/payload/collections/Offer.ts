import { type CollectionConfig } from "payload/types";

export const Offers: CollectionConfig = {
  slug: "offers",
  labels: {
    singular: "Offre",
    plural: "Offres",
  },
  admin: {
    useAsTitle: "title",
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
      name: "validityTo",
      type: "date",
      label: "Validité jusqu'au",
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
