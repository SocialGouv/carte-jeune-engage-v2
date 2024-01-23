import { type Payload } from "payload";
import { Offer } from "../payload-types";
import { partners } from "./partners";
import { categories } from "./categories";

export async function seedOffers(payload: Payload) {
  const offers: Omit<Offer, "id" | "createdAt" | "updatedAt">[] = [
    {
      title: "15% de réduction sur les produits alimentaire",
      partner: partners.findIndex((partner) => partner.name === "Cora") + 1,
      category:
        categories.findIndex((category) => category.slug === "shop") + 1,
      kind: "voucher",
    },
    {
      title: "10% de réduction sur plus de 50 produits alimentaire",
      partner: partners.findIndex((partner) => partner.name === "Lidl") + 1,
      category:
        categories.findIndex((category) => category.slug === "shop") + 1,
      kind: "voucher",
    },
    {
      title: "10% de réduction les produits alimentaire",
      partner: partners.findIndex((partner) => partner.name === "Auchan") + 1,
      category:
        categories.findIndex((category) => category.slug === "shop") + 1,
      kind: "voucher",
    },
    {
      title: "10% de réduction sur l’ensemble des billets en France et Europe",
      partner: partners.findIndex((partner) => partner.name === "Flixbus") + 1,
      category:
        categories.findIndex((category) => category.slug === "mobility") + 1,
      kind: "code",
    },
  ];

  for (const offer of offers) {
    await payload.create({
      collection: "offers",
      data: offer,
    });
  }
}
