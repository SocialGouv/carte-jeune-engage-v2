import { Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import OfferCard from "~/components/cards/OfferCard";
import { OfferIncluded } from "~/server/api/routers/offer";

const OfflinePage = () => {
  const [userOffers, setUserOffers] = useState<OfferIncluded[]>([]);

  useEffect(() => {
    const storedOffers = localStorage.getItem("cje-user-offers");
    if (storedOffers) {
      setUserOffers(JSON.parse(storedOffers));
    }
  }, []);

  return (
    <Flex flexDir="column" pt={12} px={8} h="full">
      <Heading textAlign={"center"} mb={6}>
        Pas de réseau...
      </Heading>
      <Flex flexDir="column" gap={6}>
        {userOffers.map((userOffer) => {
          return (
            <OfferCard
              key={userOffer.id}
              offer={userOffer}
              displayExpiryDate
              userOffline
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default OfflinePage;
