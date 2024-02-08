import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "~/providers/Auth";
import LoadingLoader from "~/components/LoadingLoader";
import { HiArrowLeft } from "react-icons/hi2";

export default function AccountInformation() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user)
    return (
      <Center h="full" w="full">
        <LoadingLoader />
      </Center>
    );

  return (
    <Flex flexDir="column" pt={12} px={8} h="full">
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
        Mes informations <br />
        personnelles
      </Heading>
      <Flex flexDir="column" mt={10} gap={6}>
        <Flex flexDir="column" gap={1}>
          <Text fontWeight="medium">Prénom</Text>
          <Text fontWeight="bold">{user.firstName}</Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text fontWeight="medium">Nom</Text>
          <Text fontWeight="bold">{user.lastName}</Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text fontWeight="medium">Adresse email</Text>
          <Text fontWeight="bold">{user.email}</Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text fontWeight="medium">Numéro de télephone</Text>
          <Text fontWeight="bold">{user?.phone_number ?? "-"}</Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text fontWeight="medium">Adresse</Text>
          <Text fontWeight="bold">{user?.address ?? "-"}</Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" mt="auto" gap={4} mb={10}>
        <Text fontWeight="medium" textAlign="center" px={16}>
          Vous souhaitez modifier ces informations ?
        </Text>
        <Button
          colorScheme="cje-gray"
          color="black"
          fontWeight="bold"
          variant="solid"
        >
          Nous contacter
        </Button>
      </Flex>
    </Flex>
  );
}
