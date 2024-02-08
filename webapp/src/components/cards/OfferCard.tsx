import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { OfferIncluded } from "~/server/api/routers/offer";
import { dottedPattern } from "~/utils/chakra-theme";
import { OfferKindBadge } from "../OfferKindBadge";

type OfferCardProps = {
  offer: OfferIncluded;
  displayExpiryDate?: boolean;
  userOffline?: boolean;
};

const OfferCard = ({
  offer,
  displayExpiryDate = false,
  userOffline = false,
}: OfferCardProps) => {
  return (
    <Link
      href={
        userOffline
          ? {}
          : `/dashboard/offer/${
              offer.kind === "code" ? "online" : "in-store"
            }/${offer.id}`
      }
    >
      <Flex flexDir="column">
        {!userOffline && (
          <Flex
            bgColor={offer.partner.color}
            py={5}
            borderTopRadius={12}
            position="relative"
            justifyContent="center"
            alignItems="center"
            sx={{ ...dottedPattern("#ffffff") }}
          >
            <Flex alignItems="center" borderRadius="full" p={1} bgColor="white">
              <Image
                src={offer.partner.icon.url ?? ""}
                alt={offer.partner.icon.alt ?? ""}
                width={32}
                height={32}
              />
            </Flex>
          </Flex>
        )}
        <Flex
          flexDir="column"
          p={3}
          bgColor="white"
          borderRadius={8}
          borderTopRadius={userOffline ? 8 : 0}
          gap={2}
          boxShadow="md"
        >
          <Text
            fontSize="sm"
            fontWeight="medium"
            textDecor={userOffline ? "underline" : "none"}
            textDecorationColor={offer.partner.color}
            textDecorationThickness={"2px"}
          >
            {offer.partner.name}
          </Text>
          <Text
            fontWeight={userOffline ? "normal" : "bold"}
            fontSize="sm"
            noOfLines={2}
            h="42px"
          >
            {offer.title}
          </Text>
          {userOffline && offer.coupons && offer.coupons[0] && (
            <Text my={4} fontWeight={"bold"} fontSize="xl" textAlign={"center"}>
              {offer.coupons[0].code}
            </Text>
          )}
          <Flex
            flexDirection={userOffline ? "row" : "column"}
            gap={2}
            justifyContent={"space-between"}
          >
            <OfferKindBadge kind={offer.kind} variant="light" />
            {displayExpiryDate && (
              <Flex
                alignSelf="start"
                borderRadius="2xl"
                bgColor="bgWhite"
                py={2}
                px={3}
              >
                <Text fontSize="xs" fontWeight="medium">
                  Expire le : {new Date(offer.validityTo).toLocaleDateString()}
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default OfferCard;
