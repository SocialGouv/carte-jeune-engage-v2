import { Center, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoadingLoader from '~/components/LoadingLoader';
import { OfferKindBadge } from '~/components/OfferKindBadge';
import CategoryWrapper from '~/components/wrappers/CategoryWrapper';
import { api } from '~/utils/api';
import { dottedPattern } from '~/utils/chakra-theme';

export default function Dashboard() {
  const router = useRouter();
  const { slug } = router.query;

  const { data: resultCategory } = api.category.getBySlug.useQuery(
    {
      slug: slug as string
    },
    { enabled: slug !== undefined }
  );

  const { data: category } = resultCategory || {};

  const { data: resultOffers, isLoading: isLoadingOffers } =
    api.offer.getList.useQuery(
      {
        page: 1,
        perPage: 50,
        sort: 'createdAt',
        categoryId: category?.id
      },
      { enabled: category?.id !== undefined }
    );

  const { data: offers } = resultOffers || {};

  if (!category) return;

  if (isLoadingOffers || !offers)
    return (
      <CategoryWrapper category={category}>
        <Center w="full" h="full">
          <LoadingLoader />
        </Center>
      </CategoryWrapper>
    );

  return (
    <CategoryWrapper category={category}>
      {offers
        ?.filter(offer => offer.kind === 'code')
        ?.map(offer => (
          <Link
            key={offer.id}
            href={`/dashboard/offer/${
              offer.kind === 'code' ? 'online' : 'in-store'
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
                sx={{ ...dottedPattern('#ffffff') }}
              >
                <Flex
                  alignItems="center"
                  borderRadius="full"
                  p={1}
                  bgColor="white"
                >
                  <Image
                    src={offer.partner.icon.url ?? ''}
                    alt={offer.partner.icon.alt ?? ''}
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
    </CategoryWrapper>
  );
}
