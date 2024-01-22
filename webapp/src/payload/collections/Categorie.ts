import { type CollectionConfig } from "payload/types";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: "Catégorie",
    plural: "Catégories",
  },
  fields: [
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
    },
    {
      name: "label",
      type: "text",
      label: "Libellé",
      required: true,
    },
    {
      name: "icon",
      type: "upload",
      label: "Icône",
      required: true,
      relationTo: "media",
    },
  ],
};
