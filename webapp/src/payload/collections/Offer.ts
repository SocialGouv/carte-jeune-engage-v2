import { type CollectionConfig } from "payload/types";
import {
  CustomSelectTermsOfUse,
  getItemsTermsOfUse,
} from "../components/CustomSelectField";

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
      name: "validityFrom",
      type: "date",
      label: "Offre valide à partir du",
    },
    {
      name: "validityTo",
      type: "date",
      label: "Offre valide jusqu'au (inclus)",
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
    {
      name: "nbOfEligibleStores",
      type: "number",
      label: "Nombre de magasins éligibles",
      admin: {
        condition: (_, siblingData) => siblingData.kind === "voucher",
      },
      defaultValue: 1,
    },
    {
      name: "imageOfEligibleStores",
      type: "upload",
      label: "Image des magasins éligibles",
      relationTo: "media",
      admin: {
        condition: (_, siblingData) => siblingData.kind === "voucher",
      },
    },
    {
      name: "linkOfEligibleStores",
      type: "text",
      label: "Lien des magasins éligibles",
      admin: {
        condition: (_, siblingData) => siblingData.kind === "voucher",
      },
    },
    {
      name: "termsOfUse",
      type: "array",
      label: "Comment ça marche ?",
      labels: {
        singular: "Étape",
        plural: "Étapes",
      },
      defaultValue: [],
      fields: [
        {
          name: "slug",
          type: "text",
          label: "Texte",
          admin: {
            components: {
              Field: CustomSelectTermsOfUse,
            },
          },
        },
        {
          name: "isHighlighted",
          type: "checkbox",
          label: "Mettre en avant ?",
        },
      ],
    },
    {
      name: "conditions",
      type: "array",
      label: "Conditions",
      labels: {
        singular: "Condition",
        plural: "Conditions",
      },
      fields: [
        {
          name: "text",
          type: "text",
          label: "Texte",
          required: true,
        },
      ],
    },
  ],
};
