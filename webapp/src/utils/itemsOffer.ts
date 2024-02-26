import { FiCopy } from "react-icons/fi";
import { MdOutlineDirectionsWalk } from "react-icons/md";
import {
  HiLink,
  HiMiniCheck,
  HiReceiptPercent,
  HiShoppingCart,
} from "react-icons/hi2";
import { PassIcon } from "~/components/icons/pass";
import { StackItem } from "~/components/offer/StackItems";
import { Offer } from "~/payload/payload-types";

export const getItemsSimpleTermsOfUse = (
  offerKind: Offer["kind"],
  isCouponActive: boolean
) => {
  let itemsSimpleTermsOfUse = [] as StackItem[];

  if (offerKind === "code") {
    itemsSimpleTermsOfUse = [
      {
        text: !isCouponActive
          ? "J'active cette offre"
          : "Cette offre est active",
        icon: HiMiniCheck,
      },
      { text: "Je copie mon code promo", icon: FiCopy },
      { text: "Je vais sur le site de l’offre", icon: HiLink },
    ];
  } else {
    itemsSimpleTermsOfUse = [
      {
        text: !isCouponActive
          ? "J'active cette offre"
          : "Cette offre est active",
        icon: HiMiniCheck,
      },
      { text: "Je scanne mon code barre en caisse", icon: HiReceiptPercent },
      { text: "Je présente mon pass CJE", icon: PassIcon },
    ];
  }

  return itemsSimpleTermsOfUse;
};

export const getItemsTermsOfUse = (offerKind: Offer["kind"]) => {
  let itemsSimpleTermsOfUse = [] as StackItem[];

  if (offerKind === "code") {
    itemsSimpleTermsOfUse = [
      { text: "Copier le code promo", icon: FiCopy },
      {
        text: "Utiliser le lien du site qui est dans mon application",
        icon: HiLink,
      },
      {
        text: "Coller le code promo au moment du paiement en ligne sur le site",
        icon: FiCopy,
      },
    ];
  } else {
    itemsSimpleTermsOfUse = [
      {
        text: "Je vais dans un magasin participant",
        icon: MdOutlineDirectionsWalk,
      },
      {
        text: "J’achète les articles concernés par l’offre",
        icon: HiShoppingCart,
      },
      { text: "Je scanne mon code barre en caisse", icon: HiReceiptPercent },
      {
        text: "Je présente mon pass CJE au moment du paiement",
        icon: PassIcon,
      },
    ];
  }

  return itemsSimpleTermsOfUse;
};

export const getItemsExternalLink = (offerKind: Offer["kind"]) => {
  let itemsSimpleTermsOfUse = [] as StackItem[];

  if (offerKind === "code") {
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
