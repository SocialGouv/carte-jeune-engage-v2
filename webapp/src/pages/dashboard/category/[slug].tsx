import { Box, Button, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { OfferKindBadge } from "~/components/OfferKindBadge";
import { dottedPattern } from "~/utils/chakra-theme";

export default function Dashboard() {
  const router = useRouter();
  const { slug } = router.query;

  const { data: resultCategory } = api.category.getBySlug.useQuery(
    {
      slug: slug as string,
    },
    { enabled: slug !== undefined }
  );

  const { data: category } = resultCategory || {};

  const { data: resultOffers } = api.offer.getList.useQuery(
    {
      page: 1,
      perPage: 50,
      sort: "createdAt",
      categoryId: category?.id,
    },
    { enabled: category?.id !== undefined }
  );

  const { data: offers } = resultOffers || {};

  return (
    <Flex flexDir="column" pt={12} px={8} h="full">
      <Box>
        <Button
          bgColor="white"
          variant="ghost"
          onClick={() => router.back()}
          size="md"
          iconSpacing={0}
          px={0}
          rightIcon={<ChevronLeftIcon w={6} h={6} color="black" />}
        />
        <Flex alignItems="center" gap={4} mt={4}>
          <Flex
            justifyContent="center"
            alignItems="center"
            bgColor="white"
            p={2}
            borderRadius="xl"
          >
            <Image
              src={category?.icon.url as string}
              alt={category?.icon.alt as string}
              width={58}
              height={58}
            />
          </Flex>
          <Heading as="h3" fontSize="3xl">
            {category?.label}
          </Heading>
        </Flex>
      </Box>
      <Flex
        flexDir="column"
        gap={6}
        mt={8}
        overflowY="auto"
        pb={12}
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {offers?.map((offer) => (
          <Link
            key={offer.id}
            href={`/dashboard/offer/${
              offer.kind === "code" ? "online" : "in-store"
            }/${offer.id}`}
          >
            <Flex flexDir="column">
              <Flex
                bgColor={offer.partner.color}
                py={5}
                borderTopRadius={12}
                position="relative"
                justifyContent="center"
                alignItems="center"
                sx={{ ...dottedPattern("#ffffff") }}
              >
                <Flex
                  alignItems="center"
                  borderRadius="full"
                  p={1}
                  bgColor="white"
                >
                  <Image
                    src={offer.partner.icon.url ?? ""}
                    alt={offer.partner.icon.alt ?? ""}
                    width={32}
                    height={32}
                  />
                </Flex>
              </Flex>
              <Flex
                flexDir="column"
                p={3}
                bgColor="white"
                borderBottomRadius={8}
                gap={2}
                boxShadow="md"
              >
                <Text fontSize="sm" fontWeight="medium">
                  {offer.partner.name}
                </Text>
                <Text fontWeight="bold" fontSize="sm" noOfLines={2}>
                  {offer.title}
                </Text>
                <OfferKindBadge kind={offer.kind} variant="light" />
              </Flex>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}
