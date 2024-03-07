import { Box, Container, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { menuItems } from "./Header";

const Footer = () => {
  return (
    <Flex flexDir="column" bgColor="blackLight" h="full">
      <Box
        bgColor="white"
        height={{ base: "112px", lg: "140px" }}
        borderBottomRadius={{ base: "70px", lg: "full" }}
      />
      <Container maxWidth="container.xl" px={0} h="full">
        <Flex flexDir="column" w="full" mt={16} mb={12}>
          <Flex flexDir={{ base: "column", lg: "row" }} alignItems="center">
            <Flex
              alignItems="center"
              w={{ base: "full", lg: "inherit" }}
              pr={4}
              mr={{ base: 0, lg: 3 }}
            >
              <Image
                src="/images/marianne-white.svg"
                alt="Logo marianne du gouvernement français"
                width="100%"
                height="120px"
                borderRight="1px solid"
                borderColor="#808080"
                mr={4}
              />
              <Image
                src="/images/cje-logo-white.svg"
                alt="Logo de l'application Carte Jeune Engagé"
                width="100%"
                height="90px"
              />
            </Flex>
            <Text
              fontWeight="medium"
              color="white"
              mt={{ base: 8, lg: 0 }}
              textAlign={{ base: "center", lg: "left" }}
            >
              Des remises exclusives pour les jeunes en
              <br />
              insertion.
              <br />
              Découvrez la Carte Jeune Engagé !
            </Text>
            <Flex
              flexDir="column"
              ml="auto"
              mr={{ base: "auto", lg: "inherit" }}
              mt={{ base: 12, lg: 0 }}
              gap={4}
              textAlign="start"
            >
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
          </Flex>
          <Divider
            borderColor="#6D6D6D"
            w={{ base: "80%", lg: "full" }}
            mx="auto"
            my={8}
          />
          <Flex
            alignItems="center"
            justifyContent={{ base: "center", lg: "start" }}
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
      </Container>
    </Flex>
  );
};

export default Footer;
