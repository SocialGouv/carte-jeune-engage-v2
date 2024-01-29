import { Center, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoadingLoader from '~/components/LoadingLoader';
import CategoriesWrapper from '~/components/wrappers/CategoriesWrapper';
import { api } from '~/utils/api';

export default function Dashboard() {
  const { data: resultCategories, isLoading: isLoadingCategories } =
    api.category.getList.useQuery({
      page: 1,
      perPage: 50,
      sort: 'createdAt'
    });

  const { data: categories } = resultCategories || {};

  if (isLoadingCategories || !categories)
    return (
      <CategoriesWrapper isLoading>
        <Center w="full" h="full">
          <LoadingLoader />
        </Center>
      </CategoriesWrapper>
    );

  return (
    <CategoriesWrapper>
      {categories.map(category => (
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
    </CategoriesWrapper>
  );
}
