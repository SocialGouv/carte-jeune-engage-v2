import { type Payload } from "payload";
import { Discount } from "../payload-types";
import { partners } from "./partners";
import { categories } from "./categories";

export async function seedDiscounts(payload: Payload) {
  const discounts: Omit<Discount, "id" | "createdAt" | "updatedAt">[] = [
    {
      title: "15% de réduction sur les produits alimentaire",
      partner: partners.findIndex((partner) => partner.name === "Leclerc") + 1,
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
      kind: "voucher",
    },
  ];

  for (const discount of discounts) {
    await payload.create({
      collection: "discounts",
      data: discount,
    });
  }
}
