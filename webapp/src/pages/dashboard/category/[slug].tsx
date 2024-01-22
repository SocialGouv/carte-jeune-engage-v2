import { Box, Button, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const { slug } = router.query;

  const { data: resultCategory } = api.category.getBySlug.useQuery({
    slug: slug as string,
  });

  const { data: category } = resultCategory || {};

  return (
    <Box pt={12} px={8}>
      <Link href="/dashboard/categories">
        <Button
          bgColor="white"
          variant="ghost"
          size="md"
          iconSpacing={0}
          px={0}
          rightIcon={<ChevronLeftIcon w={6} h={6} color="black" />}
        />
      </Link>
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
  );
}
