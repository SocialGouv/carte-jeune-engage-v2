import { HiLink, HiMiniCheck } from "react-icons/hi2";
import { StackItem } from "~/components/offer/StackItems";
import { Offer } from "~/payload/payload-types";

export const getItemsExternalLink = (offerKind: Offer["kind"]) => {
  let itemsSimpleTermsOfUse = [] as StackItem[];

  if (offerKind.startsWith("code")) {
    itemsSimpleTermsOfUse = [
      {
        text: "Tous les sites de nos partenaires sont sécurisés",
        icon: HiLink,
      },
      {
        text: "Vos données sont protégées et ne sont pas diffusées au partenaire",
        icon: HiMiniCheck,
      },
    ];
  }

  return itemsSimpleTermsOfUse;
};
