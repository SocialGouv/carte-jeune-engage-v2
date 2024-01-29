import path from "path";
import { type Payload } from "payload";

export const categories = [
  {
    slug: "shop",
    label: "Courses",
  },
  {
    slug: "mobility",
    label: "Mobilité",
  },
  {
    slug: "hobby",
    label: "Loisirs",
  },
  {
    slug: "sport",
    label: "Sport",
  },
  {
    slug: "hygiene",
    label: "Hygiène",
  },
  {
    slug: "equipment",
    label: "Équipement",
  },
  {
    slug: "hosting",
    label: "Hébergement",
  },
  {
    slug: "bank",
    label: "Banque, mutuelle, assurance",
  },
  {
    slug: "telephony",
    label: "Téléphone, internet",
  },
] as const;

export async function seedCategories(payload: Payload) {
  for (const category of categories) {
    const newMedia = await payload.create({
      collection: "media",
      filePath: path.join(
        __dirname,
        `../../../public/images/seeds/categories/${category.slug}.png`
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
