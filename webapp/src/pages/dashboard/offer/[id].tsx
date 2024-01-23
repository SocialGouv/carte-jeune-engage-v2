import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  useTheme,
} from "@chakra-ui/react";
import Image from "next/image";
import { api } from "~/utils/api";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { dottedPattern } from "~/utils/chakra-theme";
import { CouponIcon } from "~/components/icons/coupon";
import { FiBook, FiLock } from "react-icons/fi";

export default function Dashboard() {
  const theme = useTheme();

  const dotColor = theme.colors.bgWhite;

  const router = useRouter();
  const { id } = router.query;

  const { data: resultOffer } = api.offer.getById.useQuery(
    {
      id: parseInt(id as string),
    },
    { enabled: id !== undefined }
  );

  const { data: offer } = resultOffer || {};

  return (
    <Flex flexDir="column" h="full">
      <Flex
        bgColor={offer?.partner.color}
        p={8}
        position="relative"
        sx={{ ...dottedPattern(dotColor) }}
        alignItems="center"
      >
        <Button
          position="absolute"
          bgColor="white"
          variant="ghost"
          onClick={() => router.back()}
          size="md"
          iconSpacing={0}
          px={0}
          rightIcon={<ChevronLeftIcon w={6} h={6} color="black" />}
        />
        <Flex mx="auto" alignItems="center" gap={3}>
          <Flex
            justifyContent="center"
            alignItems="center"
            bgColor="white"
            p={2}
            borderRadius="full"
          >
            <Image
              src={offer?.partner.icon.url as string}
              alt={offer?.partner.icon.alt as string}
              width={48}
              height={48}
            />
          </Flex>
          <Text fontSize="xl" fontWeight="bold" color="white">
            {offer?.partner.name}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" bgColor="bgWhite" px={8} h="full" gap={6}>
        <Heading
          as="h3"
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          mt={6}
        >
          {offer?.title}
        </Heading>
        <Box
          position="relative"
          borderRadius="2xl"
          w="full"
          bgColor="cje-gray.500"
          textAlign="center"
          py={12}
        >
          <Text
            fontSize="2xl"
            fontWeight="bold"
            letterSpacing={4}
            sx={{ filter: "blur(4.5px)" }}
          >
            6FHDJFHEIDJF
          </Text>
          <Flex
            position="absolute"
            p={5}
            shadow="md"
            borderRadius="full"
            bgColor="white"
            justifyContent="center"
            alignItems="center"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Icon as={FiLock} w={6} h={6} aria-label="Copier le code promo" />
          </Flex>
        </Box>
        <Button rightIcon={<CouponIcon />} py={8}>
          Activer le code promo
        </Button>
        <Divider />
        <Button size="sm" colorScheme="cje-gray" color="black">
          <Flex flexDir="column" alignItems="center" gap={6}>
            <Icon as={FiBook} w={6} h={6} />
            Voir les conditions d'utilisation
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
}
