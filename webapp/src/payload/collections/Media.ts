import { type CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Image",
    plural: "Images",
  },
  upload: {
    staticURL: "/images/payload/media",
    staticDir: "../public/images/payload/media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
        height: 300,
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        // By specifying `undefined` or leaving a height undefined,
        // the image will be sized to a certain width,
        // but it will retain its original aspect ratio
        // and calculate a height automatically.
        height: undefined,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
};
