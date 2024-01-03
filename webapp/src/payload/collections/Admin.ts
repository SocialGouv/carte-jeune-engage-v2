import { type CollectionConfig } from "payload/types";

export const Admins: CollectionConfig = {
  slug: "admins",
  labels: {
    singular: "Administrateur",
    plural: "Administrateurs",
  },
  auth: true,
  fields: [
    {
      name: "email",
      type: "email",
      label: "Email",
    },
    {
      name: "firstName",
      type: "text",
      label: "Prénom",
    },
    {
      name: "lastName",
      type: "text",
      label: "Nom",
    },
  ],
};
