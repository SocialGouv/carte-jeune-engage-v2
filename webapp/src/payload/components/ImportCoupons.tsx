import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Select,
} from "@chakra-ui/react";
import Papa from "papaparse";
import type { Props } from "payload/components/views/List";
import React, { useCallback, useState } from "react";
import { api } from "~/utils/api";
import { convertFrenchDateToEnglish } from "~/utils/tools";
import { Modal, useModal } from "@faceless-ui/modal";
import { MinimalTemplate } from "payload/components/templates";
import { Coupon } from "../payload-types";

export type ImportCouponsProps = {};

const ImportCoupons = ({ hasCreatePermission, resetParams }: Props) => {
  const { toggleModal } = useModal();
  const modalSlug = "modal-import-coupons";

  const [csvFileValue, setCsvFileValue] = useState<string | undefined>("");
  const [offerId, setOfferId] = useState<number>();
  const [coupons, setCoupons] = useState<
    {
      code: string;
      status: "available" | "archived";
      offer: number;
    }[]
  >([]);

  const { data: offers } = api.offer.getList.useQuery({
    page: 1,
    perPage: 1000,
  });
  const { mutate: createCoupons } = api.coupon.create.useMutation({
    onSuccess() {
      resetParams();
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setCsvFileValue(undefined);
      Papa.parse(file, {
        complete: (result) => {
          const couponsToCreate = result.data
            .filter(
              (row: any) =>
                row.code &&
                row.validityTo &&
                convertFrenchDateToEnglish(row.validityTo)
            )
            .map((row: any) => {
              return {
                code: row.code as string,
                status: "available" as "available",
                offer: -1,
              };
            });

          setCoupons(couponsToCreate);
          toggleModal(modalSlug);
        },
        header: true,
        dynamicTyping: true,
      });
    }
  };

  const validate = () => {
    if (!offerId) return;

    if (coupons.length)
      createCoupons(coupons.map((c) => ({ ...c, offer: offerId })));

    toggleModal(modalSlug);
  };

  if (!hasCreatePermission || !offers) return;

  return (
    <Box>
      <input
        id="csvInput"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        value={csvFileValue}
        onClick={() => {
          setCsvFileValue("");
        }}
        style={{ display: "none" }}
      />
      <Button as="label" htmlFor="csvInput" cursor="pointer">
        Importer un CSV
      </Button>
      <Modal slug={modalSlug} className="delete-document">
        <MinimalTemplate className="delete-document__template">
          <Heading size="lg">
            Offre pour laquelle importer des bons de réduction :
          </Heading>
          <FormControl>
            <Select
              placeholder="Sélectionner une offre"
              onChange={(e) => {
                setOfferId(parseInt(e.target.value));
              }}
              required
            >
              {offers.data.map((offer) => (
                <option key={offer.id} value={offer.id}>
                  {offer.title}
                </option>
              ))}
            </Select>
          </FormControl>
          <Flex mt={4} justifyContent={"flex-start"}>
            <Button
              onClick={() => {
                toggleModal(modalSlug);
              }}
            >
              Annuler
            </Button>
            <Button
              colorScheme="whiteBtn"
              color="black"
              ml={4}
              onClick={validate}
            >
              Valider
            </Button>
          </Flex>
        </MinimalTemplate>
      </Modal>
    </Box>
  );
};

export default ImportCoupons;
