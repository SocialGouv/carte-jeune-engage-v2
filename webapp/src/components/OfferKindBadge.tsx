import { Flex, Icon, Text } from "@chakra-ui/react";
import { type Offer } from "~/payload/payload-types";
import { BsCart2 } from "react-icons/bs";
import { OnlineIcon } from "~/components/icons/online";

export const OfferKindBadge = ({
  kind,
  variant,
}: {
  kind: Offer["kind"];
  variant: "light" | "dark";
}) => {
  return (
    <Flex
      py={1}
      px={3}
      borderRadius="full"
      gap={2}
      alignItems="center"
      bgColor={variant === "light" ? "white" : "black"}
    >
      {kind === "voucher" ? (
        <Icon
          as={BsCart2}
          color={variant === "light" ? "black" : "white"}
          width="16px"
          height="16px"
        />
      ) : (
        <OnlineIcon
          color={variant === "light" ? "black" : "white"}
          width="16px"
          height="16px"
        />
      )}

      <Text
        color={variant === "light" ? "black" : "white"}
        fontSize="xs"
        fontWeight="medium"
      >
        {kind === "voucher" ? "En magasin" : "En ligne"}
      </Text>
    </Flex>
  );
};
