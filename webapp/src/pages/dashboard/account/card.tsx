import { Box, Center, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "~/providers/Auth";
import LoadingLoader from "~/components/LoadingLoader";
import { HiArrowLeft, HiCheckBadge } from "react-icons/hi2";
import Image from "next/image";

export default function AccountCard() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user)
    return (
      <Center h="full" w="full">
        <LoadingLoader />
      </Center>
    );

  return (
    <Box pt={12} pb={36} px={8}>
      <Icon
        as={HiArrowLeft}
        w={6}
        h={6}
        onClick={() => router.back()}
        cursor="pointer"
      />
      <Heading
        as="h2"
        size="lg"
        fontWeight="extrabold"
        mt={4}
        textAlign="center"
      >
        Ma carte CJE
      </Heading>
      <Flex
        flexDir="column"
        alignItems="center"
        bgColor="white"
        borderRadius="1.5xl"
        pt={12}
        pb={6}
        mt={10}
        gap={8}
      >
        <Box borderRadius="full" overflow="hidden">
          <Image
            src={user.image.url as string}
            alt={user.image.alt as string}
            width={111}
            height={111}
            objectFit="cover"
            objectPosition="center"
            style={{ width: "111px", height: "111px" }}
          />
        </Box>
        <Flex flexDir="column" alignItems="center" gap={3}>
          <Text fontSize="2xl" fontWeight="extrabold">
            {user.firstName} {user.lastName}
          </Text>
          <Text fontSize="sm" fontWeight="medium">
            ID {user.id}
          </Text>
        </Flex>
        <Flex
          alignItems="center"
          bgColor="primary.500"
          borderRadius="xl"
          px={3}
          py={2}
        >
          <Icon as={HiCheckBadge} w={5} h={5} fill="white" mr={2} />
          <Text fontSize="sm" fontWeight="bold" color="white">
            Carte vérifiée
          </Text>
        </Flex>
        <Flex flexDir="column" alignItems="center" gap={3}>
          <Image
            src="/images/government-banner.png"
            alt="Bandeau du gouvernement français"
            width={82}
            height={49}
          />
          <Text
            fontSize="xs"
            fontWeight="medium"
            color="disabled"
            textAlign="center"
          >
            Carte membre beta testeur 2024
            <br />
            Projet carte jeunes engagés
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
