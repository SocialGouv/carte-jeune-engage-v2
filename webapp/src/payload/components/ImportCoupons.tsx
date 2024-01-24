import { Box, Button } from "@chakra-ui/react";
import Papa from "papaparse";
import type { Props } from "payload/components/views/List";
import React, { useCallback } from "react";
import { api } from "~/utils/api";
import { convertFrenchDateToEnglish } from "~/utils/tools";

export type ImportCouponsProps = {};

const ImportCoupons = ({ hasCreatePermission, resetParams }: Props) => {
  if (!hasCreatePermission) return;

  const { mutate: createCoupons } = api.coupon.create.useMutation({
    onSuccess() {
      resetParams();
    },
  });

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        Papa.parse(file, {
          complete: (result) => {
            createCoupons(
              result.data
                .filter(
                  (row: any) =>
                    row.code &&
                    row.validityTo &&
                    convertFrenchDateToEnglish(row.validityTo)
                )
                .map((row: any) => {
                  const englishDate = convertFrenchDateToEnglish(
                    row.validityTo
                  );

                  return {
                    code: row.code,
                    validityTo: new Date(englishDate as string).toISOString(),
                    status: "available",
                    offer: 1,
                  };
                })
            );
          },
          header: true, // Si votre CSV a une ligne d'en-tête
          dynamicTyping: true, // Convertit automatiquement les valeurs en types appropriés
        });
      }
    },
    []
  );

  return (
    <Box>
      <input
        id="csvInput"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Button as="label" htmlFor="csvInput" cursor="pointer">
        Importer un CSV
      </Button>
    </Box>
  );
};

export default ImportCoupons;
