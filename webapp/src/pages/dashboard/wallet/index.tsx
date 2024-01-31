import { Box, Center, Heading, Icon, TabPanel, Text } from "@chakra-ui/react";
import LoadingLoader from "~/components/LoadingLoader";
import OfferCard from "~/components/cards/OfferCard";
import WalletWrapper from "~/components/wrappers/WalletWrapper";
import { api } from "~/utils/api";
import { PiSmileySadFill } from "react-icons/pi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  const router = useRouter();
  const { offerKind } = router.query as {
    offerKind?: "in-store" | "online";
  };

  const [tabIndex, setTabIndex] = useState(2);

  useEffect(() => {
    setTabIndex(offerKind === "in-store" ? 0 : offerKind === "online" ? 1 : 2);
  }, [offerKind]);

  const handleTabsChange = (index: number) => {
    router.replace({
      query: { offerKind: index === 0 ? "in-store" : "online" },
    });
    setTabIndex(index);
  };

  if (
    (!offerKind || (offerKind !== "in-store" && offerKind !== "online")) &&
    router.isReady
  ) {
    router.replace({
      query: {
        ...router.query,
        offerKind: "in-store",
      },
    });
  }

  const { data: resultUserOffers, isLoading: isLoadingUserOffers } =
    api.offer.getListOfAvailables.useQuery({
      page: 1,
      perPage: 50,
      sort: "createdAt",
      isCurrentUser: true,
    });

  const { data: currentUserOffers } = resultUserOffers || {};

  const inStoreOffers = currentUserOffers?.filter(
    (offer) => offer.kind === "voucher"
  );

  const onlineOffers = currentUserOffers?.filter(
    (offer) => offer.kind === "code"
  );

  if (isLoadingUserOffers) {
    return (
      <WalletWrapper tabIndex={tabIndex} handleTabsChange={handleTabsChange}>
        <Center h="full" w="full">
          <LoadingLoader />
        </Center>
      </WalletWrapper>
    );
  }

  return (
    <WalletWrapper tabIndex={tabIndex} handleTabsChange={handleTabsChange}>
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
