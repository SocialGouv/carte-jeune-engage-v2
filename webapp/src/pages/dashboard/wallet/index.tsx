import { Box, Center, Heading, Icon, TabPanel, Text } from "@chakra-ui/react";
import LoadingLoader from "~/components/LoadingLoader";
import OfferCard from "~/components/cards/OfferCard";
import WalletWrapper from "~/components/wrappers/WalletWrapper";
import { api } from "~/utils/api";
import { PiSmileySadFill } from "react-icons/pi";

const WalletNoData = ({ kind }: { kind: "in-store" | "online" }) => {
  return (
    <Box textAlign="center" mt={40}>
      <Icon as={PiSmileySadFill} w={10} h={10} />
      <Heading size="md" mt={1} mb={2}>
        Aucune offre actuellement ici
      </Heading>
      <Text color="gray.500">
        Activez les{" "}
        {kind === "in-store" ? "bons de réductions" : "codes promos"} qui vous
        intéressent il s’afficheront ici pour que vous puissiez les utiliser
      </Text>
    </Box>
  );
};

export default function Wallet() {
  const { data: resultUserOffers, isLoading: isLoadingUserOffers } =
    api.offer.getListOfAvailables.useQuery({
      page: 1,
      perPage: 50,
      sort: "createdAt",
      isCurrentUser: true,
    });

  const { data: currentUserOffers } = resultUserOffers || {};

  const onlineOffers = currentUserOffers?.filter(
    (offer) => offer.kind === "code"
  );

  const inStoreOffers = currentUserOffers?.filter(
    (offer) => offer.kind === "voucher"
  );

  if (isLoadingUserOffers) {
    return (
      <WalletWrapper>
        <TabPanel p={0}>
          <Center h="full" w="full">
            <LoadingLoader />
          </Center>
        </TabPanel>
      </WalletWrapper>
    );
  }

  return (
    <WalletWrapper>
      <TabPanel p={0}>
        {inStoreOffers && inStoreOffers.length > 0 ? (
          inStoreOffers?.map((offer) => (
            <OfferCard key={offer.id} offer={offer} displayExpiryDate />
          ))
        ) : (
          <WalletNoData kind="in-store" />
        )}
      </TabPanel>
      <TabPanel p={0}>
        {onlineOffers && onlineOffers.length > 0 ? (
          onlineOffers?.map((offer) => (
            <OfferCard key={offer.id} offer={offer} displayExpiryDate />
          ))
        ) : (
          <WalletNoData kind="online" />
        )}
      </TabPanel>
    </WalletWrapper>
  );
}
