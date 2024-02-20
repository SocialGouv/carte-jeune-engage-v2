import { type CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Image",
    plural: "Images",
  },
  upload: {
    mimeTypes: ["image/*"],
    disableLocalStorage: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
};
