import { type CollectionConfig } from "payload/types";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Publication",
    plural: "Publications",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Content",
      required: true,
    },
  ],
};
