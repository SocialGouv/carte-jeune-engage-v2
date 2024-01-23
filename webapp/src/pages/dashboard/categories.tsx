import { Box, Button, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  const { data: resultCategories } = api.category.getList.useQuery({
    page: 1,
    perPage: 50,
    sort: "createdAt",
  });

  const { data: categories } = resultCategories || {};

  return (
    <Flex flexDir="column" pt={12} px={8} h="full">
      <Flex alignItems="center" gap={4}>
        <Button
          bgColor="white"
          variant="ghost"
          size="md"
          iconSpacing={0}
          px={0}
          onClick={() => router.back()}
          rightIcon={<ArrowBackIcon w={6} h={6} color="black" />}
        />
        <Heading as="h3" fontSize="2xl">
          Les catégories
        </Heading>
      </Flex>
      <SimpleGrid
        columns={2}
        spacing={4}
        alignItems="center"
        mt={8}
        pb={12}
        overflowY="auto"
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {categories?.map((category) => (
          <Link key={category.id} href={`/dashboard/category/${category.slug}`}>
            <Flex
              flexDir="column"
              borderRadius="xl"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              bgColor="white"
              h="120px"
            >
              <Image
                src={category.icon.url as string}
                alt={category.icon.alt as string}
                width={58}
                height={58}
              />
              <Text fontWeight="medium" fontSize="sm" mt={1.5}>
                {category.label}
              </Text>
            </Flex>
          </Link>
        ))}
      </SimpleGrid>
    </Flex>
  );
}
