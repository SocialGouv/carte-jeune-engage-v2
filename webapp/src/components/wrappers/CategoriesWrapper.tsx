import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type CategoriesWrapperProps = {
  children: ReactNode;
  isLoading?: boolean;
};

const CategoriesWrapper = ({ children, isLoading }: CategoriesWrapperProps) => {
  const router = useRouter();

  return (
    <Flex flexDir="column" pt={12} px={8} h="full">
      <Flex alignItems="center" gap={4}>
        <Button
          colorScheme="whiteBtn"
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
        columns={isLoading ? 1 : 2}
        spacing={4}
        alignItems="center"
        h="full"
        mt={8}
        pb={12}
        overflowY="auto"
        sx={{
          '::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        {children}
      </SimpleGrid>
    </Flex>
  );
};

export default CategoriesWrapper;
