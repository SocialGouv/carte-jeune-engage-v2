import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import ChakraNextImage from "../ChakraNextImage";
import { HiMiniBars3 } from "react-icons/hi2";
import Link from "next/link";

export const menuItems = [
  { title: "Qu'est-ce que c'est ?", slug: "what-is-it" },
  { title: "Qui peut en profiter ?", slug: "who-can-benefit" },
  { title: "Comment ça marche ?", slug: "how-does-it-work" },
  { title: "FAQ", slug: "faq" },
];

const Header = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const handleIsEligibleClick = () => {
    const element = document.querySelector(".phone-number-cta");
    if (element) (element as HTMLElement).focus();
  };

  return (
    <Flex
      id="login-gov-image"
      position="sticky"
      top={0}
      zIndex={1000}
      py={6}
      pb={4}
      bgColor="white"
      justifyContent="space-between"
      alignItems="center"
      pl={4}
      pr={6}
    >
      <Flex id="login-gov-image" alignItems="center" h="full">
        <ChakraNextImage
          src="/images/marianne.svg"
          alt="Logo marianne du gouvernement français"
          width={74}
          height={49}
          borderRight="1px solid"
          borderColor="#808080"
          pr={2}
          mr={3}
        />
        <ChakraNextImage
          src="/images/cje-logo.png"
          alt="Logo de l'application Carte Jeune Engagé"
          width={69}
          height={38}
        />
      </Flex>
      {!isDesktop ? (
        <Menu>
          <MenuButton>
            <Icon as={HiMiniBars3} w={8} h={8} />
          </MenuButton>
          <MenuList style={{ position: "relative" }}>
            {menuItems.map((item) => (
              <Link key={item.slug} href={`/#${item.slug}-section`}>
                <MenuItem key={item.title}>{item.title}</MenuItem>
              </Link>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <>
          <Flex alignItems="center" gap={8}>
            {menuItems.map((item) => (
              <Link key={item.slug} href={`/#${item.slug}-section`}>
                <Text fontWeight="medium">{item.title}</Text>
              </Link>
            ))}
          </Flex>
          <Button
            size="md"
            py={7}
            px={5}
            borderRadius="xl"
            fontSize="lg"
            onClick={handleIsEligibleClick}
          >
            Vérifier mon éligibilité
          </Button>
        </>
      )}
    </Flex>
  );
};

export default Header;
