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
      name: "phone_number",
      type: "text",
      required: true,
      unique: true,
      label: "Numéro de téléphone",
    },
    {
      name: "civility",
      type: "select",
      label: "Civilité",
      options: [
        {
          label: "Monsieur",
          value: "man",
        },
        {
          label: "Madame",
          value: "woman",
        },
      ],
    },
    {
      name: "birthDate",
      type: "date",
      label: "Date de naissance",
    },
    {
      name: "firstName",
      type: "text",
      saveToJWT: true,
      label: "Prénom",
    },
    {
      name: "lastName",
      type: "text",
      label: "Nom",
    },
    {
      name: "address",
      type: "text",
      label: "Adresse",
    },
    {
      name: "image",
      type: "upload",
      label: "Photo de profil",
      relationTo: "media",
    },
    {
      name: "timeAtCEJ",
      type: "select",
      label: "Temps passé au CEJ",
      options: [
        {
          label: "Viens de s'inscrire",
          value: "started",
        },
        {
          label: "Moins de 3 mois",
          value: "lessThan3Months",
        },
        {
          label: "Plus de 3 mois",
          value: "moreThan3Months",
        },
      ],
    },
    {
      name: "userEmail",
      type: "text",
      label: "Email de l'utilisateur",
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
    {
      name: "preferences",
      saveToJWT: true,
      type: "relationship",
      label: "Préférences",
      relationTo: "categories",
      hasMany: true,
    },
  ],
};
