import { SelectInput, useField, useFormFields } from "payload/components/forms";
import { Offer } from "../payload-types";
import React from "react";
import { StackItem } from "~/components/offer/StackItems";

export const getItemsTermsOfUse = (
  offerKind: Offer["kind"]
): { text: string; slug: string; icon: string }[] => {
  if (offerKind.startsWith("code")) {
    return [
      { text: "Copier le code promo", slug: "copy-code", icon: "FiCopy" },
      {
        text: "Utiliser le lien du site qui est dans mon application",
        slug: "use-link",
        icon: "HiLink",
      },
      {
        text: "Coller le code promo au moment du paiement en ligne sur le site",
        slug: "paste-code",
        icon: "FiCopy",
      },
    ];
  } else {
    return [
      {
        text: "Je vais dans un magasin participant",
        slug: "go-to-store",
        icon: "MdOutlineDirectionsWalk",
      },
      {
        text: "J’achète les articles concernés par l’offre",
        slug: "buy-items",
        icon: "HiShoppingCart",
      },
      {
        text: "Je scanne mon code barre en caisse",
        slug: "scan-barcode",
        icon: "HiReceiptPercent",
      },
      {
        text: "Je présente ma carte CJE au moment du paiement",
        slug: "show-pass",
        icon: "PassIcon",
      },
    ];
  }
};

export const CustomSelectTermsOfUse: React.FC<{ path: string }> = ({
  path,
}) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = React.useState<
    { label: string; value: string }[]
  >([]);

  const offerKind = useFormFields(([fields, _]) => fields.kind);

  React.useEffect(() => {
    const tmpOptions = getItemsTermsOfUse(
      offerKind?.value as Offer["kind"]
    ).map((item) => ({
      label: item.text,
      value: item.slug,
    }));
    setOptions(tmpOptions);
  }, [offerKind]);

  return (
    <div className="field-type">
      <label className="field-label">Texte</label>
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={(e) => setValue(e.value)}
      />
    </div>
  );
};
