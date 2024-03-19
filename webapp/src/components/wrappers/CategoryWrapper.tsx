import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { CategoryIncluded } from "~/server/api/routers/category";
import Image from "next/image";
import { push } from "@socialgouv/matomo-next";

type CategoryWrapperProps = {
  children: ReactNode;
  category: CategoryIncluded;
};

const CategoryWrapper = ({ children, category }: CategoryWrapperProps) => {
  const router = useRouter();
  return (
    <Flex flexDir="column" py={12} px={8} h="full">
      <Box>
        <Button
          colorScheme="whiteBtn"
          onClick={() => {
            push(["trackEvent", "Retour"]);
            router.back();
          }}
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
              src={category.icon.url as string}
              alt={category.icon.alt as string}
              width={58}
              height={58}
            />
          </Flex>
          <Heading as="h3" fontSize="3xl">
            {category.label}
          </Heading>
        </Flex>
      </Box>
      <Flex flexDir="column" gap={6} mt={8} h="full" pb={12}>
        {children}
      </Flex>
    </Flex>
  );
};

export default CategoryWrapper;
