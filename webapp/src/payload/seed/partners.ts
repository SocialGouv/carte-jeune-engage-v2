import path from "path";
import { type Payload } from "payload";

export const partners = [
  {
    name: "Leclerc",
    description: "Description de Leclerc",
  },
  {
    name: "Lidl",
    description: "Description de Lidl",
  },
  {
    name: "Auchan",
    description: "Description de Auchan",
  },
  {
    name: "Flixbus",
    description: "Description de Flixbus",
  },
] as const;

export async function seedPartners(payload: Payload) {
  for (const partner of partners) {
    const newMedia = await payload.create({
      collection: "media",
      filePath: path.join(
        __dirname,
        `../../../public/seeds/partners/${partner.name.toLowerCase()}.svg`
      ),
      data: {
        alt: `${partner.name.toLowerCase()} icon`,
      },
    });

    await payload.create({
      collection: "partners",
      data: {
        icon: newMedia.id,
        ...partner,
      },
    });
  }
}
