import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type CategoriesWrapperProps = {
  children: ReactNode;
  isLoading?: boolean;
};

const CategoriesWrapper = ({ children, isLoading }: CategoriesWrapperProps) => {
  return (
    <Flex flexDir="column" pt={12} pb={24} px={8}>
      <SimpleGrid
        columns={isLoading ? 1 : 2}
        spacing={5}
        alignItems="center"
        pb={12}
      >
        {children}
      </SimpleGrid>
    </Flex>
  );
};

export default CategoriesWrapper;
