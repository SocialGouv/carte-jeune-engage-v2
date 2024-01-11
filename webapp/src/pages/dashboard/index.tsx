import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
import { OfferKindBadge } from "~/components/OfferKindBadge";

export default function Dashboard() {
  const { data: resultCategories, isLoading: isLoadingCategories } =
    api.category.getList.useQuery({
      page: 1,
      perPage: 50,
      sort: "createdAt",
    });

  const { data: resultOffers, isLoading: isLoadingOffers } =
    api.offer.getList.useQuery({
      page: 1,
      perPage: 50,
    });

  const { data: categories } = resultCategories || {};

  const { data: offers } = resultOffers || {};

  return (
    <Box>
      <Flex flexDir="column" pt={12}>
        <Flex alignItems="center" justifyContent="space-between" px={8}>
          <Heading as="h3" fontSize="xl">
            Catégories
          </Heading>
          <Link href="/dashboard/categories">
            <Text fontWeight="medium" color="primary.500">
              Tout voir
            </Text>
          </Link>
        </Flex>
        <Flex
          alignItems="center"
          px={8}
          mt={4}
          gap={4}
          overflowX="auto"
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {isLoadingCategories ? (
            <Text>Loading...</Text>
          ) : (
            categories?.map((category) => (
              <Flex key={category.id} flexDir="column" textAlign="center">
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  bgColor={category.color}
                  borderRadius={8}
                  width="82px"
                  height="74px"
                >
                  <Image
                    src={category.icon.url ?? ""}
                    alt={category.icon.alt ?? ""}
                    width={40}
                    height={40}
                  />
                </Flex>
                <Text mt={2}>{category.label}</Text>
              </Flex>
            ))
          )}
        </Flex>
      </Flex>
      <Flex flexDir="column" mt={10}>
        <Flex alignItems="center" justifyContent="space-between" px={8}>
          <Heading as="h3" fontSize="xl">
            Des offres pour vous
          </Heading>
          <Link href="/dashboard/categories">
            <Text fontWeight="medium" color="primary.500">
              Tout voir
            </Text>
          </Link>
        </Flex>
        <Flex
          alignItems="center"
          px={8}
          mt={4}
          gap={4}
          overflowX="auto"
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {isLoadingOffers ? (
            <Text>Loading...</Text>
          ) : (
            offers?.map((offer) => (
              <Flex key={offer.id} flexDir="column" minW="250px">
                <Flex
                  flexDir="column"
                  bgColor={offer.category.color}
                  gap={2}
                  p={3}
                  borderTopRadius={12}
                >
                  <Box alignSelf="start">
                    <OfferKindBadge kind={offer.kind} variant="dark" />
                  </Box>
                  <Flex alignItems="center" gap={4}>
                    <Box bgColor="white" borderRadius={6} p={1}>
                      <Image
                        src={offer.partner.icon.url ?? ""}
                        alt={offer.partner.icon.alt ?? ""}
                        width={40}
                        height={40}
                      />
                    </Box>
                    <Text fontWeight="bold">{offer.partner.name}</Text>
                  </Flex>
                </Flex>
                <Flex
                  flexDir="column"
                  p={3}
                  bgColor="white"
                  borderBottomRadius={8}
                >
                  <Flex alignItems="center" gap={2}>
                    <Box
                      bgColor={offer.category.color}
                      borderRadius="full"
                      p={1}
                    >
                      <Image
                        src={offer.category.icon.url ?? ""}
                        alt={offer.partner.icon.alt ?? ""}
                        width={20}
                        height={20}
                      />
                    </Box>
                    <Text fontSize="sm">{offer.category.label}</Text>
                  </Flex>
                  <Text fontWeight="bold" fontSize="sm" noOfLines={2} mt={2}>
                    {offer.title}
                  </Text>
                </Flex>
              </Flex>
            ))
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
