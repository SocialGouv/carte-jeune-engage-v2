import { type CollectionConfig } from "payload/types";

export const Permissions: CollectionConfig = {
  slug: "permissions",
  labels: {
    singular: "Autorisation",
    plural: "Autorisations",
  },
  admin: {
    useAsTitle: "phone",
  },
  fields: [
    {
      name: "phone",
      type: "text",
      unique: true,
      label: "Téléphone",
    },
  ],
};
