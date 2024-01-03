import dynamic from "next/dynamic";
import { Props } from "payload/dist/admin/components/views/collections/List/types";
import { type CollectionConfig } from "payload/types";

const ListActions = dynamic<Props>(
  () => import("~/components/admin/ListActions"),
  { ssr: false }
);

export const Offers: CollectionConfig = {
  slug: "offers",
  labels: {
    singular: "Offre",
    plural: "Offres",
  },
  admin: {
    components: {
      BeforeListTable: [ListActions],
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Titre",
      required: true,
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      label: "Utilisateur",
      relationTo: "users",
      required: true,
    },
  ],
};
