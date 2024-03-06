import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { menuItems } from "./Header";

const Footer = () => {
  return (
    <Flex flexDir="column" bgColor="blackLight" h="full">
      <Box bgColor="white" height="75px" borderBottomRadius="full" />
      <Flex flexDir="column" w="full" mt={16} mb={12}>
        <Flex alignItems="center" w="full" pr={4}>
          <Image
            src="/images/marianne-white.svg"
            alt="Logo marianne du gouvernement français"
            width="100%"
            height="120px"
          />
          <Divider
            orientation="vertical"
            mr={4}
            borderWidth="1.35px"
            borderColor="white"
          />
          <Image
            src="/images/cje-logo-white.svg"
            alt="Logo de l'application Carte Jeune Engagé"
            width="100%"
            height="90px"
          />
        </Flex>
        <Text fontWeight="medium" color="white" mt={8} textAlign="center">
          Des remises exclusives pour les jeunes en
          <br />
          insertion.
          <br />
          Découvrez la Carte Jeune Engagé !
        </Text>
        <Flex flexDir="column" mx="auto" mt={12} gap={4} textAlign="start">
          <Text color="white" fontSize="lg" fontWeight="bold">
            Vérifier mon éligibilité
          </Text>
          {menuItems.map((item) => (
            <Text
              key={item.title}
              fontWeight="bold"
              color="white"
              fontSize="lg"
            >
              {item.title}
            </Text>
          ))}
        </Flex>
        <Divider borderColor="disabled" w="80%" mx="auto" my={8} />
        <Flex
          alignItems="center"
          justifyContent="center"
          gap={4}
          flexWrap="wrap"
        >
          <Text color="white" fontSize="lg" fontWeight="bold">
            CGU
          </Text>
          <Text color="white" fontSize="lg" fontWeight="bold">
            Mentions légales
          </Text>
          <Text color="white" fontSize="lg" fontWeight="bold">
            Politique de confidentialité
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
