import { GlobalConfig } from "payload/types";

export const QuickAccess: GlobalConfig = {
  slug: "quickAccess",
  label: "Accès rapides",
  fields: [
    {
      name: "items",
      label: "Accès rapides",
      labels: {
        singular: "Accès rapide",
        plural: "Accès rapides",
      },
      type: "array",
      required: true,
      fields: [
        {
          name: "partner",
          type: "relationship",
          relationTo: "partners",
          label: "Partenaire",
          required: true,
        },
        {
          name: "offer",
          type: "relationship",
          filterOptions: (options: any) => ({
            partner: {
              equals: options.siblingData.partner,
            },
          }),
          admin: {
            condition: (_, siblingData: any) => {
              return !!siblingData.partner;
            },
          },
          relationTo: "offers",
          label: "Offre",
        },
      ],
    },
  ],
};
