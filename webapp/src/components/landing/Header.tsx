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
  return (
    <Flex
      id="login-gov-image"
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
        />
        <Divider
          orientation="vertical"
          mr={2.5}
          borderWidth="1.35px"
          borderColor="blackLight"
        />
        <ChakraNextImage
          src="/images/cje-logo.png"
          alt="Logo de l'application Carte Jeune Engagé"
          width={69}
          height={38}
        />
      </Flex>
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
    </Flex>
  );
};

export default Header;
