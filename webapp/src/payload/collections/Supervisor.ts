import { type CollectionConfig } from "payload/types";

export const Supervisors: CollectionConfig = {
  slug: "supervisors",
  auth: true,
  labels: {
    singular: "Référent",
    plural: "Référents",
  },
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "email",
      type: "email",
      unique: true,
      label: "Email",
    },
    {
      name: "cgu",
      type: "checkbox",
      label: "CGU Acceptées",
      admin: {
        description:
          "Cette case est cochée si le référent a accepté les CGU (première connexion)",
      },
      defaultValue: false,
    },
  ],
};
