import { Flex, Icon, Text } from "@chakra-ui/react";
import { PassIcon } from "../icons/pass";
import { HiWrenchScrewdriver } from "react-icons/hi2";

const PassInCreation = () => {
  return (
    <Flex
      flexDir="column"
      my={8}
      borderRadius="xl"
      w="full"
      bgColor="cje-gray.500"
      textAlign="center"
      gap={4}
      alignItems="center"
      p={8}
    >
      <Flex alignItems="center" alignSelf="center">
        <Flex bgColor="blackLight" py={1.5} px={2.5} borderRadius="lg">
          <PassIcon color="cje-gray.500" />
        </Flex>
        <Flex bgColor="cje-gray.500" borderRadius="full" p={2.5} ml={-1}>
          <Icon as={HiWrenchScrewdriver} w={6} h={6} />
        </Flex>
      </Flex>
      <Text fontWeight="bold" px={10}>
        Votre carte CJE est en cours de création
      </Text>
      <Text fontWeight="medium" fontSize="sm">
        Notre équipe vérifie votre photo en ce moment. D’ici 24h vous aurez
        votre carte CJE pour bénéficier de toutes les offres en magasin
        disponibles sur l’application.
      </Text>
    </Flex>
  );
};

export default PassInCreation;
