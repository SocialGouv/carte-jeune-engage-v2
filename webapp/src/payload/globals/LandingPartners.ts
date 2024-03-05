import { GlobalConfig } from "payload/types";

export const LandingPartners: GlobalConfig = {
  slug: "landingPartners",
  label: "Logos des partenaires sur la page d'accueil",
  fields: [
    {
      name: "items",
      label: "Partenaires",
      labels: {
        singular: "Partenaire",
        plural: "Partenaires",
      },
      type: "array",
      fields: [
        {
          name: "partner",
          type: "relationship",
          relationTo: "partners",
          label: "Partenaire",
          required: true,
        },
      ],
    },
  ],
};
