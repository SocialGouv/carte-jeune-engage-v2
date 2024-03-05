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
          <MenuItem>Qu'est-ce que c'est ?</MenuItem>
          <MenuItem>Qui peut en profiter ?</MenuItem>
          <MenuItem>Comment ça marche ?</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;
