import { Props } from "payload/dist/admin/components/views/collections/List/types";
import { Box, Button } from "@chakra-ui/react";

export const ListActions = (props: Props) => {
  if (props.data.totalDocs === 0) {
    return null;
  }

  return (
    <Box style={{ display: "flex", gap: 12 }}>
      <Button>Exporter CSV {props.collection.slug}</Button>
    </Box>
  );
};

export default ListActions;
