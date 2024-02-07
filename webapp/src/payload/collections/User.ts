import { type CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  labels: {
    singular: "Utilisateur",
    plural: "Utilisateurs",
  },
  admin: {
    useAsTitle: "email",
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
    {
      name: "image",
      type: "upload",
      label: "Photo de profil",
      relationTo: "media",
    },
    {
      name: "status_image",
      type: "select",
      label: "Statut de la photo de profil",
      defaultValue: "pending",
      options: [
        {
          label: "En attente",
          value: "pending",
        },
        {
          label: "Validée",
          value: "approved",
        },
        {
          label: "Refusée",
          value: "rejected",
        },
      ],
    },
  ],
};
