import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { Category, Discount } from "~/payload/payload-types";
import { api } from "~/utils/api";
import { DiscountKindBadge } from "~/components/DiscountKindBadge";

export default function Dashboard() {
  const { data: resultCategories, isLoading: isLoadingCategories } =
    api.category.getList.useQuery();

  const { data: resultDiscounts, isLoading: isLoadingDiscounts } =
    api.discount.getList.useQuery();

  const { data: categories } = resultCategories || {};

  const { data: discounts } = resultDiscounts || {};

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
            categories?.map((category: Category) => (
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
                    src={category.icon.url}
                    alt={category.icon.alt}
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
          {isLoadingDiscounts ? (
            <Text>Loading...</Text>
          ) : (
            discounts?.map((discount: Discount) => (
              <Flex key={discount.id} flexDir="column" minW="250px">
                <Flex
                  flexDir="column"
                  bgColor={discount.category.color}
                  gap={2}
                  p={3}
                  borderTopRadius={12}
                >
                  <Box alignSelf="start">
                    <DiscountKindBadge kind={discount.kind} variant="dark" />
                  </Box>
                  <Flex alignItems="center" gap={4}>
                    <Box bgColor="white" borderRadius={6} p={1}>
                      <Image
                        src={discount.partner.icon.url}
                        alt={discount.partner.icon.alt}
                        width={40}
                        height={40}
                      />
                    </Box>
                    <Text fontWeight="bold">{discount.partner.name}</Text>
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
                      bgColor={discount.category.color}
                      borderRadius="full"
                      p={1}
                    >
                      <Image
                        src={discount.category.icon.url}
                        alt={discount.partner.icon.alt}
                        width={20}
                        height={20}
                      />
                    </Box>
                    <Text fontSize="sm">{discount.category.label}</Text>
                  </Flex>
                  <Text fontWeight="bold" fontSize="sm" noOfLines={2} mt={2}>
                    {discount.title}
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
