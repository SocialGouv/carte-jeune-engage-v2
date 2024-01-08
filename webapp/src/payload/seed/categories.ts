import path from "path";
import { type Payload } from "payload";

export const categories = [
  {
    slug: "shop",
    label: "Courses",
    color: "#FACBD1",
  },
  {
    slug: "care",
    label: "Soins",
    color: "#CDE0FF",
  },
  {
    slug: "services",
    label: "Services",
    color: "#DBF0EB",
  },
  {
    slug: "telephony",
    label: "Téléphonie",
    color: "#FEDF6B",
  },
  {
    slug: "mobility",
    label: "Mobilité",
    color: "#CACAFB",
  },
] as const;

export async function seedCategories(payload: Payload) {
  for (const category of categories) {
    const newMedia = await payload.create({
      collection: "media",
      filePath: path.join(
        __dirname,
        `../../../public/seeds/categories/${category.slug}.${
          category.slug === "mobility" ? "png" : "svg"
        }`
      ),
      data: {
        alt: `${category.slug} icon`,
      },
    });

    await payload.create({
      collection: "categories",
      data: {
        icon: newMedia.id,
        ...category,
      },
    });
  }
}
