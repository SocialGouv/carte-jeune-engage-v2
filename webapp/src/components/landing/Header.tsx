import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  Portal,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import ChakraNextImage from "../ChakraNextImage";
import { HiMiniBars3, HiXMark } from "react-icons/hi2";
import Link from "next/link";
import { useRef } from "react";

export const menuItems = [
  { title: "Qu'est-ce que c'est ?", slug: "what-is-it" },
  { title: "Qui peut en profiter ?", slug: "who-can-benefit" },
  { title: "Comment ça marche ?", slug: "how-does-it-work" },
  { title: "FAQ", slug: "faq" },
];

const Header = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onToggle } = useDisclosure();

  const headerRef = useRef<HTMLDivElement>(null);

  const handleIsEligibleClick = () => {
    const element = document.querySelector(".phone-number-cta");
    if (element) (element as HTMLElement).focus();
    onToggle();
  };

  return (
    <Box ref={headerRef} position="sticky" top={0} zIndex={1000}>
      <Flex
        id="login-gov-image"
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
          <Stack ml="auto">
            <Icon
              as={!isOpen ? HiMiniBars3 : HiXMark}
              w={8}
              h={8}
              onClick={onToggle}
              cursor="pointer"
              display={{ md: "none" }}
            />
            <Portal containerRef={headerRef}>
              <Collapse in={isOpen}>
                <Stack
                  p={4}
                  display={{ md: "none" }}
                  position="absolute"
                  top={20}
                  bgColor="white"
                  w="full"
                >
                  {menuItems.map(({ slug, title }, index) => (
                    <Stack
                      key={slug}
                      textAlign="center"
                      bgColor="bgWhite"
                      borderTopRadius={index === 0 ? "2xl" : "none"}
                      borderBottom="1px solid"
                      borderColor="gray.300"
                    >
                      <Box
                        py={3}
                        as="a"
                        href={`/#${slug}-section` ?? "#"}
                        onClick={onToggle}
                        justifyContent="space-between"
                        alignItems="center"
                        _hover={{
                          textDecoration: "none",
                        }}
                      >
                        <Text fontWeight={600} color="gray.700">
                          {title}
                        </Text>
                      </Box>
                    </Stack>
                  ))}
                  <Stack
                    textAlign="center"
                    bgColor="bgWhite"
                    borderColor="gray.300"
                    borderBottomRadius="2xl"
                    py={3}
                    px={8}
                  >
                    <Button
                      colorScheme="blackBtn"
                      onClick={handleIsEligibleClick}
                      size="md"
                      py={7}
                      borderRadius="3xl"
                    >
                      Vérifier mon éligibilité
                    </Button>
                  </Stack>
                </Stack>
              </Collapse>
            </Portal>
          </Stack>
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
    </Box>
  );
};

export default Header;
