import { type CollectionConfig } from "payload/types";

export const Coupons: CollectionConfig = {
  slug: "coupons",
  labels: {
    singular: "Bon de réduction",
    plural: "Bons de réduction",
  },
  fields: [
    {
      name: "code",
      type: "text",
      label: "Code",
      required: true,
      unique: true,
    },
    {
      name: "status",
      type: "select",
      label: "Statut",
      options: [
        { label: "Disponible", value: "available" },
        { label: "Archivé", value: "archived" },
      ],
      defaultValue: "available",
      required: true,
    },
    {
      name: "validityTo",
      type: "date",
      label: "Validité jusqu'au",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      label: "Utilisateur",
      relationTo: "users",
      hasMany: false,
    },
    {
      name: "offer",
      type: "relationship",
      label: "Offre",
      relationTo: "offers",
      hasMany: false,
      required: true,
    },
  ],
};
