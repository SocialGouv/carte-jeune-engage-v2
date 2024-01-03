import { type CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  labels: {
    singular: "Utilisateur",
    plural: "Utilisateurs",
  },
  fields: [
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      unique: true,
    },
    {
      name: "firstName",
      type: "text",
      label: "Prénom",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      label: "Nom",
      required: true,
    },
  ],
};
